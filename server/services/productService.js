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
    module.exports = {
    getAll,
    create 
};

