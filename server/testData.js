const db = require('./models');

const products = [
    {
        title: "Arsenal Hemmatröja 2023/24",
        body: "Den klassiska röda tröjan.",
        imageUrl: "https://images.unsplash.com/photo-1621275471763-2f7507326090?w=500", // Exempelbild
        price: 899.00,
        stock: 50
    },
    {
        title: "Real Madrid Bortatröja",
        body: "Mörkblå.",
        imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500",
        price: 949.50,
        stock: 30
    },
    {
        title: "Sverige Hemmatröja",
        body: "Den gula landslagströjan.",
        imageUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=500",
        price: 799.00,
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