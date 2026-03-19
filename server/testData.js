const db = require('./models');

const products = [
    {
        title: "Dennis Bergkamp Hemmatröja",
        body: "Den klassiska röda tröjan.",
        imageUrl: "http://localhost:4000/Bergkamp.png", // Exempelbild
        price: 2899.00,
        stock: 50
    },
    {
        title: "Real Madrid Hemmatröja Zinedine Zidane",
        body: "Helvit",
        imageUrl: "http://localhost:4000/Zidane.png", // Exempelbild
        price: 2949.50,
        stock: 30
    },
    {
        title: "Klassisk Inter-tröja med Ronaldo",
        body: "Ronaldo",
        imageUrl: "http://localhost:4000/Ronaldo.png", // Exempelbild
        price: 3799.00,
        stock: 100
    },
    {
        title: "Allesandro Del Piero Hemmatröja",
        body: "Del Piero",
        imageUrl: "http://localhost:4000/DelPiero.png", // Exempelbild
        price: 2799.00,
        stock: 100
    },
    {
        title: "Hagi VM 1994 Tröja",
        body: "Hagi",
        imageUrl: "http://localhost:4000/Hagi.png", // Exempelbild
        price: 5799.00,
        stock: 100
    },
    {
        title: "Erik Cantona Hemmatröja",
        body: "Cantona",
        imageUrl: "http://localhost:4000/Cantona.png", // Exempelbild
        price: 1999.00,
        stock: 100
    },
    {
        title: "Figo Real Madrid Hemmatröja",
        body: "Figo",
        imageUrl: "http://localhost:4000/Figo.png", // Exempelbild
        price: 3799.00,
        stock: 100
    },
    {
        title: "Roy Keane Manchester United Hemmatröja",
        body: "Keane",
        imageUrl: "http://localhost:4000/Keane.png", // Exempelbild
        price: 3799.00,
        stock: 100
    }
];

const users = [
    {
        firstName: "Fredrik",
        lastName: "Hamilton",
        email: "fredrik.ferrari@example.com",
        phoneNr: "0701112233"
    },
    {
        firstName: "Pär",
        lastName: "Verstappen",
        email: "par.redbull@example.com",
        phoneNr: "0702223344"
    },
    {
        firstName: "Rickard",
        lastName: "Russel",
        email: "rickard.mercedes@example.com",
        phoneNr: "0703334455"
    }
];

// Lägg till ett seed för några användare också.

async function testData() {
    try {

         await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Rensa tabellen först så vi inte får dubbletter varje gång vi kör filen
        await db.products.destroy({ where: {}, truncate: true });
        await db.users.destroy({ where: {}, truncate: true });
        
        // Lägg in tröjorna
        await db.products.bulkCreate(products);

        // lägg in användarena
        await db.users.bulkCreate(users);
        
        console.log("Det gick bra.");
        process.exit();
    } catch (error) {
        console.error("Något gick fel:", error);
        process.exit(1);
    }
}

testData();