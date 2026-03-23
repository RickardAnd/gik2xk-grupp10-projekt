const db = require("../models");
const validate = require("validate.js");
const { sequelize } = require("../models");

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
        return createResponseError(422, invalidData)
    }
    try {
            const newPost = await db.products.create(product);
            
            return createResponseSuccess(newPost);           
     } catch (error) {
            return createResponseError(error.status, error.message);
    }
}

// Hämtar en product med tillhörande betyg
async function getById(id) {
    try {
        const product = await db.products.findOne({
            where: { id },
            attributes: {
                // Lägg till och skicka med dessa fält som är beräknade från ratingtabellen
                include: [
                    [ 
                    // .literal skickar med en ren SQL fråga till databasen. Subquery
                    // Medelvärdet räknas direkt i databasen
                    sequelize.literal(`(
                        SELECT AVG(rating)
                        FROM ratings
                        WHERE ratings.product_id = products.id
                        )`),
                        // Vad fältet ska heta i objektet
                        'Medelbetyg'
                
                    ],     
                    [
                    // Räknar antal betyg, direkt i databasen
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM ratings
                        WHERE ratings.product_id = products.id
                        )`),
                        'Antalbetyg'
                    ]
            ]
        },

            // Includerar även alla rader med betyg
            include: [
                {
                model: db.ratings,
                attributes: ['rating', 'createdAt']
            }],
        
        });

        if (!product) {
            return createResponseError(404, 'Produkten hittades inte');
        }

        
        // Returnerar produkt med alla betyg och uträkningar.
        return createResponseSuccess(product); 

    } catch (error) {
        console.error("GetById error:", error);
        return createResponseError(500, error.message);
    }
}

async function update(data, id) {
    // Validera inkommande data mot våra constraints
    const invalidData = validate(data, constraints);
    // Im inge ID
    if (!id) {
        return createResponseError(422, 'ID är obligatoriskt');
    }
    
    if (invalidData) {
        return createResponseError(422, invalidData);
    }

    try {
        // Kontrollera om produkten finns)
        const existingItem = await db.products.findOne({ where: { id } });
        
        if (!existingItem) {
            return createResponseError(404, 'Objektet kunde inte hittas');
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

// Funktion för att lägga till betyg till produkterna
async function addRating(productId, rating) {
    // Kontroll
    if(!productId) {
        return createResponseError(422, "Produkt Id är obligatoriskt");
    }
    try {
        // Kopplar beyget till en specifik produkt
        rating.productId = productId;
        const newRating = await db.ratings.create(rating);
        return createResponseSuccess(newRating);           
     } catch (error) {
            return createResponseError(error.status, error.message);
    }
    }

    module.exports = {
    getAll,
    create,
    update,
    destroy,
    getById,
    addRating
};

