const db = require("../models");
const validate = require("validate.js");

// Hämtar helpers
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require("../helpers/responseHelper")


//Skapa

async function create(user) {
    const invalidData = validate(user, constraints);
    if(invalidData) {
        createResponseError(422, invalidData)
    }
    try {
            const newUser = await db.users.create(user);
            return createResponseSuccess(newUser);           
     } catch (error) {
            return createResponseError(error.status, error.message);
    }
}

// Hämta allA
async function getAll() {
    try {
        const allUsers = await db.users.findAll();
       
        return createResponseSuccess(allUsers);
    } catch (error) {
        return createResponseError(error.status, error.message)
    }    
}


// Uppdatera
async function update(user, id) {
    const invalidData = validate(user, constraints);
    if (!id) return createResponseError(422, "ID saknas");
    if (invalidData) return createResponseError(422, invalidData);

    try {
        await db.users.update(user, { where: { id } });
        return createResponseMessage(200, "Användaren uppdaterad");
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// hämta med id
async function getById(id) {
    try {
        const user = await db.users.findByPk(id);
        if (!user) return createResponseError(404, "Användaren hittades inte");
        return createResponseSuccess(user);
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

// TA bort
async function destroy(id) {
    if (!id) return createResponseError(422, "ID saknas");

    try {
        await db.users.destroy({ where: { id } });
        return createResponseMessage(200, "Användaren borttagen");
    } catch (error) {
        return createResponseError(500, error.message);
    }
}

module.exports = {
    create,
    getAll,
    update,
    getById,
    destroy
};