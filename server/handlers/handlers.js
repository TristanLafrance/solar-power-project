"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/* - Post - a new user, sending information from the IP API - Contry, Lat, Long, etc... */
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

/* - Get - the information from newUser */
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

/* - Post -  information from the /Information form's */
const newInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const id = req.params.id
        console.log(id)
        const formData = req.body
        
        await db.collection("usersInfo").insertOne({ 
            id: id,
            firstName: formData.firstName ,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            agree: formData.termsOfServices
        })

        
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

/* - Post - information from the "How much money will I make ?" */
const calcInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const usersId = req.params.id
        console.log(usersId)
        

        const paid = req.body.perKiloWattsHour
        const power = req.body.eachPannelPower
        const solarPannel = req.body.numbSolarPanel
        const sunHour = req.body.kWPerSquareMeter
        // Solar pannel system output in KwH/day
        const systemOutputPerDay = (sunHour * (solarPannel * (power/1000)) * 0.75).toFixed(2)

        // Solar pannel system output in KwH/year
        const systemOutputPerYear = (systemOutputPerDay * 365.25).toFixed(2)

        // How much money saved per day 
        const moneyPerDay = (systemOutputPerDay * paid).toFixed(2)

        // How much money saved per year
        const moneyPerYear = (systemOutputPerYear * paid).toFixed(2)

        await db.collection("usersDataYourPannel").insertOne({ 
            id: usersId,
            systemOutputPerDay: systemOutputPerDay,
            systemOutputPerYear: systemOutputPerYear,
            moneyPerDay: moneyPerDay,
            moneyPerYear: moneyPerYear
        })
        
        
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

/* - Post - information from the "When does it get worth it ?" */
const payback = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const usersId = req.params.id
        console.log(usersId)
        
        
        const paidPerKwH = req.body.perKiloWattsHour
        const power = req.body.eachPannelPower
        const solarPannel = req.body.numbSolarPanel
        const sunHour = req.body.kWPerSquareMeter
        const cost = parseInt(req.body.cost)
        
        // Solar pannel system output in KwH/day
        const systemOutputPerDay = (sunHour * (solarPannel * (power / 1000)) * 0.75).toFixed(2)

        // Solar pannel system output per year in KwH/day
        const systemOutputPerYear = (systemOutputPerDay * 365.25).toFixed(2)

        // Money saved per day 
        const moneyPerDay = (systemOutputPerDay * paidPerKwH).toFixed(2)

        // Money saved per year
        const moneyPerYear = parseInt((moneyPerDay * 365.25).toFixed(2))

        // Time to pay back in days
        const timePaybackDay = (cost / moneyPerDay)
        
        // Time to pay back in year
        const timePaybackYear = parseInt(cost / moneyPerYear)

        // Insert the data in the database
        await db.collection("usersDataPayback").insertOne({ 
            id: usersId,
            systemOutputPerDay: systemOutputPerDay,
            systemOutputPerYear: systemOutputPerYear,
            moneyPerDay: moneyPerDay,
            moneyPerYear: moneyPerYear,
            timePaybackDay: timePaybackDay,
            timePaybackYear: timePaybackYear,
            cost: cost
        })
        
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

/*  - Get - all information that the user want to see from the "When does it get worth it ?" - Final result - */
const getResultPayback = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const id = req.params.id

        const result = await db.collection("usersDataPayback").findOne({ id: id})

        res.status(200).json({ 
            data: result,
            message: "success"
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
        })
    }
};

/* - Get - all information that the user want to see from the "How much money will I make ?" - Final result - */
const getYourPannel = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // ---- Client connected ---- //
        client.connect();
        console.log("Connected");
        const db = client.db()

        const id = req.params.id

        const result = await db.collection("usersDataYourPannel").findOne({ id: id})

        res.status(200).json({ 
            data: result,
            message: "success"
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
        })
    }
};

/* - Get - information gathered from a user  */
const getUser = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI, options);

    try{    
         // ---- Client connected ---- //
            client.connect();
            console.log("Connected");
            const db = client.db()

            const id = req.params.id

            const user = await db.collection("usersInfo").findOne({ id: id })

            res.status(200).json({
                data: user, 
                message: "success"
            })
            // ---- Client disconnected ---- // 
            client.close();
            console.log("disconnected!");

    }catch(e){
        // else if err -->
        res.status(400).json({
            status: 400,
            message: e.message
        })
    }
};



module.exports = { 
    newUser,
    getCo,
    newInfo,
    calcInfo,
    payback,
    getResultPayback,
    getYourPannel,
    getUser
}; 