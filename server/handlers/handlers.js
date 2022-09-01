"use strict";

const { v4: uuidv4 } = require("uuid");
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
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()
        

        const result = await db.collection("users").find().toArray();
        res.status(200).json({
            status: 200,
            message: result
        });

        // ---- Client disconnected ---- // 
        client.close();
        console.log("disconnected!");
    }
    catch(e) {
        // else if err --> 
        res.status(400).json({ 
            status: 400,
            message: e.message
        });
    }
};

const newUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const id = uuidv4()
        console.log(id)

        let usersData = {
            id: id,
            ...req.body
        }

        console.log(usersData)
        await db.collection("users").insertOne(usersData)
        
        res.status(200).json({
            data: usersData.id,
            message: "success"
        })

        // ---- Client disconnected ---- // 
        client.close();
        console.log("disconnected!");
    }
    catch(e) {
        // else if err -->
        res.status(400).json({
            status: 400, 
            message: e.message
        })
    }
};

// .find doesn't work
const getCo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const usersId  = req.params.id
        
        let toFind = await db.collection("users").findOne({ id: usersId });

        console.log(toFind)
        
        res.status(200).json({
            data: toFind,
            message: "success"
        })

        // ---- Client disconnected ---- // 
        client.close();
        console.log("disconnected!");
    }
    catch(e) {
        // else if err -->
        res.status(400).json({
            status: 400, 
            message: e.message
        })
    }
};

const newInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const formData = req.body
        const entriesData = Object.values(formData)[0]

        const userInfo = {
            id: uuidv4(),
            firstName: entriesData.firstName ,
            lastName: entriesData.lastName,
            email: entriesData.email,
            phoneNumber: entriesData.phoneNumber
        }
        console.log(userInfo)
        await db.collection("usersInfo").insertOne({ userInfo })

        
        
        
        res.status(200).json({
            data: [],
            message: "success"
        })

        // ---- Client disconnected ---- // 
        client.close();
        console.log("disconnected!");
    }
    catch(e) {
        // else if err -->
        res.status(400).json({
            status: 400, 
            message: e.message
        })
    }
};
// TODO
const calcInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const usersId = req.params.id
        console.log(usersId)
        // README for the calculation and variable
        // TODO

        const paid = req.body.perKiloWattsHour
        const power = req.body.eachPannelPower
        const solarPannel = req.body.numbSolarPanel
        const sunHour = req.body.kWPerSquareMeter
        // Solar pannel system output in KwH/day
        const systemOutputPerDay = sunHour * (solarPannel * (power/1000)) * 0.75

        // Solar pannel system output in KwH/year
        const systemOutputPerYear = systemOutputPerDay * 365.25

        // How much money saved per day 
        const moneyPerDay = systemOutputPerDay * paid

        // How much money saved per year
        const moneyPerYear = systemOutputPerYear * paid

        // Object containing all the users results 
        const usersYourPannel = {
            id: usersId,
            systemOutputPerDay: systemOutputPerDay,
            systemOutputPerYear: systemOutputPerYear,
            moneyPerDay: moneyPerDay,
            moneyPerYear: moneyPerYear
        }
        await db.collection("usersDataYourPannel").insertOne({ usersYourPannel })
        
        
        res.status(200).json({
            data: [],
            message: "success"
        })

        // ---- Client disconnected ---- // 
        client.close();
        console.log("disconnected!");
    }
    catch(e) {
        // else if err -->
        res.status(400).json({
            status: 400, 
            message: e.message
        })
    }
};

module.exports = { 
    test,
    newUser,
    getCo,
    newInfo,
    calcInfo
}; 