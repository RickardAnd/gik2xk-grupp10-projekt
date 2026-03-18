const db = require("../models")

// Hämtar helpers
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require("../helpers/responseHelper")


// Lägg til produkt i cart
async function addToCart (userId, productId) {

    try {
        // Hitta eller skapa en cart för användaren.
        const [cart] = await db.cart.findOrCreate({
            where: { userId: userId }
        });  

        // kollar om produkten redan finnsi cart_row. Ska då matcha cartId från cart och productId från products.
        const existingCartRow = await db.cart_row.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
    }) 
    // Om den finns så öka antalet med 1 i quantity i tabellen cart_row. save sparar i databasen
    if(existingCartRow) {
        existingCartRow.quantity += 1;
        await existingCartRow.save();
        return createResponseSuccess(existingCartRow);
    } else {
        // Om den inte redan finns så skapar vi en ny rad
        const newRow = await db.cart_row.create({
            cartId: cart.id,
            productId: productId,
            quantity: 1
        })
        return createResponseSuccess(newRow);
    }

    } catch (error) {
        return createResponseError(error.status || 500, error.message);
    }

}

// Hämtar kundvagn till specifik user.
async function getCartByUserId(userId) {
    try {
        // Kolla om det finns en befintlig cart.
        let cart = await db.cart.findOne({
            where: { userId: userId },
            // Här slår vi ihop (include) cart med produkttabellen och hämtar produktinformation ( id, title, price).
            include: [
                {
                    model: db.products,
                    attributes: [ 'id', 'title', 'price'],
                    through: { attributes: ['quantity'] } // hämtar här också saldo från cart_row
                }
            ]
        });

        // Om inte 
        if (!cart) {
            return createResponseSuccess({ message: "Finns ingen kundvagn" });
        }
        // Skickar tillbaka cart tillsammans med produktderaljer och antal 
        return createResponseSuccess(cart);
    } catch (error) {
        return createResponseError(error.status || 500, error.message);
    }
}

module.exports = { 
    addToCart,
    getCartByUserId
 };