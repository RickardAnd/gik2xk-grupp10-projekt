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

// Hämtar en product med id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    productService.getById(id).then((result) => {
        res.status(result.status).json(result.data);
    });
})

// Radera product
router.delete('/:id', (req, res) => {
        const id = req.params.id;

        productService.destroy(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Ändra/Uppdatera product med id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const product = req.body;
    productService.update(product, id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

// Lägger till betyg till produkt
router.post("/:id/addrating", (req, res) => {
    const rating = req.body;
    const productId = req.params.id;

    productService.addRating(productId, rating).then((result) => {
        res.status(result.status).json(result.data);
        });
})

module.exports = router;