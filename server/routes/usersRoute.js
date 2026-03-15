const router = require("express").Router();
const db = require('../models');
const validate = require('validate.js');
const productService = require('../services/productService');

const constraints = {
    email: {
      length: {
        minimum: 4,
        maximum: 200,
        tooShort: "^E-postadressen måste vara minst %{count} tecken lång",
        tooLong: "^E-postadressen får vara högst %{count} tecken lång"
        },
        email: {
            message: "^E-postadressen måste vara en giltig e-postadress"
        }
    },
    firstName: {
        length: {
        minimum: 2,
        maximum: 50,
        tooShort: "^Förnamnet måste vara minst %{count} tecken lång",
        tooLong: "^Förnamnet får vara högst %{count} tecken lång"
      }
    },
    lastName: {
        length: {
        minimum: 2,
        maximum: 50,
        tooShort: "^Efternamnet måste vara minst %{count} tecken lång",
        tooLong: "^Efternamnet får vara högst %{count} tecken lång"
    }
  }
};

router.get('/:id/products', (req, res) => {
    const id = req.params.id;
    productService.getByAuthor(id).then((result) => {
        res.status(result.status).json(result.data);
    });
});

router.get('/', (req, res) => {
    db.users.findAll().then((result) => {
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.users.findByPk(id).then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Användaren hittades inte" });
        }
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    const invalidData = validate(user, constraints);
    if(invalidData) {
        res.status(400).json(invalidData);
    } else {
        db.users.create(user).then((result) => {
        res.send(result);
    });
  } 
});

router.put('/:id', (req, res) => {
    const user = req.params.id;
    const invalidData = validate(user, constraints);
    const id = user.id;
    if(invalidData || !id) {
        res.status(400).json(invalidData || "Id saknas");
    } else {
      db.users.update(user, {
        where: {id: user.id}
    })
    .then((result) => {
      res.send(result);
    });
   }
});

router.delete('/', (req, res) => {
    db.users.destroy({ 
        where: {id: req.body.id}
    }).then((result) => {
        res.json('användaren raderad');
    });
});

module.exports = router;