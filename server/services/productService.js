const db = require("../models");
const validate = require("validate.js");

// Hämtar helpers
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require("../helpers/responseHelper")

const constraints = {
    // Ändra "title" till vad ditt fält heter i databasen (t.ex. "name")
    title: {
        presence: { allowEmpty: false, message: "får inte vara tom" }
    }
};

// Hämta alla produkter
async function getAll() {
    try {
        const allProducts = await db.products.findAll();
       
        return createResponseSuccess(allProducts);
    } catch (error) {
        return createResponseError(error.status, error.message)
    }    
}

// Lägg till en produkt
async function create(product) {
    const invalidData = validate(product, constraints);
    if(invalidData) {
        createResponseError(422, invalidData)
    }
    try {
            const newPost = await db.products.create(product);
            // Lägg till eventuella taggar
            //await _addTagToPost(newPost, post.tag);
            return createResponseSuccess(newPost);           
     } catch (error) {
            return createResponseError(error.status, error.message);
    }
}

async function getById(id) {
    try {
        const product = await db.products.findOne({
            where: { id },
            // Vi tar bort tag och comment, men behåller user om ni vill visa 
            // vem som lagt upp produkten. Annars kan include tas bort helt.
            
            // Kommenterade bort -FD
            //include: [db.users] 
        });

        if (!product) {
            return createResponseError(404, 'Produkten hittades inte');
        }

        // Om du har en formateringsfunktion för produkter, använd den här.
        // Annars kan du returnera product direkt.
        return createResponseSuccess(product); // Ändrad till sucsess iställer för ok

    } catch (error) {
        console.error("GetById error:", error);
        return createResponseError(500, error.message);
    }
}

async function update(data, id) {
    // Validera inkommande data mot dina constraints
    const invalidData = validate(data, constraints);
    
    if (!id) {
        return createResponseError(422, 'ID är obligatoriskt');
    }
    
    if (invalidData) {
        return createResponseError(422, invalidData);
    }

    try {
        // Kontrollera om objektet finns (Använd db.products om det är shoppen, db.Post om det är bloggen)
        const existingItem = await db.products.findOne({ where: { id } });
        
        if (!existingItem) {
            return createResponseError(404, 'Objektet kunde inte hittas');
        }

        // Hantera kopplingar (t.ex. taggar). 
        // OBS: Se till att det står data.tags (plural) om det är det du skickar från frontend
        if (data.tags) {
            await _addTagToPost(existingItem, data.tags);
        }

        // Utför själva uppdateringen i databasen
        await db.products.update(data, {
            where: { id }
        });

        return createResponseMessage(200, 'Uppdateringen lyckades');
        
    } catch (error) {
        // Logga felet i terminalen så du ser vad som går snett
        console.error("Update error:", error);
        return createResponseError(500, error.message);
    }
}

async function destroy(id) {
    // Kontrollera att ett ID faktiskt skickats med
    if (!id) {
        return createResponseError(422, 'ID är obligatoriskt');
    }

    try {
        // Försök radera produkten
        const result = await db.products.destroy({ 
            where: { id }
        });

        // Kontrollera om något faktiskt raderades
        // result kommer vara 1 om en rad togs bort, 0 om inget hittades
        if (result === 0) {
            return createResponseError(404, 'Produkten hittades inte och kunde inte raderas');
        }

        return createResponseMessage(200, 'Produkten har raderats från systemet');

    } catch (error) {
        // Logga felet 
        console.error("Delete error:", error);
        return createResponseError(500, error.message);
    }
}

    module.exports = {
    getAll,
    create,
    update,
    destroy,
    getById
};

