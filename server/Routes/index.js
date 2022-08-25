'use strict';

const router = require("express").Router();

// importing handlers from controllers.js
const {
    test
} = require("../Controllers/controllers");

// Endpoints

router.get("/test", test);


router.get("*", ( req , res ) => {
    res.status(400).json({ 
        status: 400,
        message: "Endpoint not found!"
    });
});

module.exports = router;