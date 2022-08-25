"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const test = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI, options);

    try {
        client.connect();
        console.log("Connected");
        const db = client.db()

        const result = await db.collection("users").find().toArray();
        res.status(200).json({
            status: 200,
            message: result
        });
    }
    catch(e) {
        // else if err --> 
        res.status(400).json({ 
            status: 400,
            message: e.message
        });
    }
};

module.exports = { 
    test
}; 