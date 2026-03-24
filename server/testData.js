const db = require('./models');

const products = [
    {
        title: "Dennis Bergkamp",
        body: "Bergkamps ikoniska tröja från Arsenal. Dennis Bergkamp är en av de mest älskade och respekterade fotbollsspelarna i Arsenals historia. Denna tröja representerar hans tid i klubben, där han var känd för sin eleganta spelstil, tekniska skicklighet och förmåga att göra spektakulära mål. Bergkamp var en nyckelspelare under Arsenals framgångsrika period på 1990- och tidiga 2000-talet, och hans tröja är en symbol för hans bidrag till klubben.",
        imageUrl: "http://localhost:4000/Bergkamp.png", // Exempelbild
        price: 2899.00,
        stock: 50
    },
    {
        title: "Zinedine Zidane",
        body: "Zidanes ikoniska tröja från 2002 Galacticos Real Madrid-säsongen. Zidane är en av de mest legendariska fotbollsspelarna genom tiderna, känd för sin eleganta spelstil och tekniska skicklighet. Denna tröja representerar hans tid i Real Madrid, där han var en nyckelspelare och bidrog till klubbens framgångar under början av 2000-talet.",
        imageUrl: "http://localhost:4000/Zidane.png", // Exempelbild
        price: 2949.50,
        stock: 30
    },
    {
        title: "Ronaldo Nazario",
        body: "Ronaldos ikoniska tröja från 2002 Galacticos Real Madrid-säsongen. Ronaldo är en av de mest framstående fotbollsspelarna genom tiderna, känd för sin snabbhet, teknik och målskytte. Denna tröja representerar hans tid i Real Madrid, där han var en nyckelspelare och bidrog till klubbens framgångar under början av 2000-talet.",
        imageUrl: "http://localhost:4000/Ronaldo.png", // Exempelbild
        price: 3799.00,
        stock: 100
    },
    {
        title: "Del Piero",
        body: "Del Pieros ikoniska tröja från Juventus som han bar under matchen mot Milan. Del Piero är en av de mest framstående italienska fotbollsspelarna genom tiderna, känd för sin teknik, kreativitet och målskytte. Denna tröja representerar hans tid i Juventus, där han var en nyckelspelare och bidrog till klubbens framgångar under sin karriär.",
        imageUrl: "http://localhost:4000/DelPiero.png", // Exempelbild
        price: 2799.00,
        stock: 100
    },
    {
        title: "Gheorghe Hagi",
        body: "Rumäniens största fotbollsspelare genom tiderna, känd som \"Karpatens Maradona\". Här är tröjan från VM 1994, där Hagi var en av stjärnorna och ledde Rumänien till en imponerande kvartfinalplats.",
        imageUrl: "http://localhost:4000/Hagi.png", // Exempelbild
        price: 5799.00,
        stock: 100
    },
    {
        title: "Erik Cantona",
        body: "Cantona var en ikonisk spelare för Manchester United och är känd för sin karismatiska personlighet både på och utanför planen. Här är tröjan från hans tid i klubben, där han var en nyckelspelare och bidrog till klubbens framgångar under 1990-talet.",
        imageUrl: "http://localhost:4000/Cantona.png", // Exempelbild
        price: 1999.00,
        stock: 100
    },
    {
        title: "Luis Figo",
        body: "Figo var en portugisisk mittfältare som spelade för klubbar som Barcelona, Real Madrid och Inter Milan under sin karriär. Här är den klassiska nr 10 i Real Madrid.",
        imageUrl: "http://localhost:4000/Figo.png", // Exempelbild
        price: 3799.00,
        stock: 100
    },
    {
        title: "Roy Keane",
        body: "Keane var en irländsk mittfältare som spelade för klubbar som Manchester United och är känd för sin ledarskapsförmåga och aggressiva spelstil. Här är den klassiska nr 16 tröjan från Manchester United.",
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