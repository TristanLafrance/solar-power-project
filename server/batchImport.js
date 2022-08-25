const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useUnifiedTopology: true,
};


const dbFunction = async (dbName) => {
    const client = new MongoClient(MONGO_URI, options);

    // ---- Client connected ---- // 
    await client.connect();
    const db = client.db(dbName)
    console.log("connected !")

    // export data in mongodb
    await db.collection("users").insertOne({ id: "123456", isActive: true, firstName: "Tristan", lastName: "Lafrance", email: "titanlaf55@hotmail.com"});
    
    // ---- Client disconnected ---- //
    client.close();
    console.log("Disconnected !")
};

dbFunction("solar_power_project");