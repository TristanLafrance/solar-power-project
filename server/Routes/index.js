'use strict';

const router = require("express").Router();

// importing handlers from controllers.js
const {
    test,
    newUser,
    getCo,
    newInfo,
    calcInfo
} = require("../handlers/handlers");

// Endpoints

router.get("/test", test);
router.post("/post-user", newUser);
router.get("/get-co/:id", getCo)
router.post("/post-calc-info/:id", calcInfo)
router.post("/post-info", newInfo)


router.get("*", ( req , res ) => {
    res.status(400).json({ 
        status: 400,
        message: "Endpoint not found!"
    });
});

module.exports = router;