"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

        const id = req.params.id
        console.log(id)
        const formData = req.body
        

        const userInfo = {
            id: id,
            firstName: formData.firstName ,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            agree: formData.termsOfServices
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

const payback = async (req, res) => {
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



module.exports = { 
    newUser,
    getCo,
    newInfo,
    calcInfo,
    payback,
    getResultPayback,
    getYourPannel
}; 