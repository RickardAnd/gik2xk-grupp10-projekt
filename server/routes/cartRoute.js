const router = require("express").Router();
const cartService = require("../services/cartService")


// Lägger till produkt i cart och skapar kundvagn vid behov.
router.post("/add", async (req, res) => {
    // Hämtar userId och productId
    const {userId, productId} = req.body;
    const result = await cartService.addToCart(userId, productId);
    res.status(result.status).json(result.data);
})

// hämtar kundvagnen. /cart/user/:id
router.get("/user/:id", async (req, res) => {
    // Hämtar upp userId
    const userId = req.params.id;
    const result = await cartService.getCartByUserId(userId);
    res.status(result.status).json(result.data);
    
});

module.exports = router;