const router = require("express").Router();
const productService = require("../services/productService")

//Hämtar alla inlägg
router.get("/", (req, res) => {
    productService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    })
})

// lägg till
router.post("/", (req, res) => {
    const product = req.body;
    productService.create(product).then((result) => {
        res.status(result.status).json(result.data);
        });
})

module.exports = router;