'use strict';

const router = require("express").Router();

// importing handlers from controllers.js
const {
    newUser,
    getCo,
    newInfo,
    calcInfo,
    payback,
    getResultPayback,
    getYourPannel
} = require("../handlers/handlers");

// Endpoints

router.get("/get-co/:id", getCo);
router.get("/get-result-payback/:id", getResultPayback);
router.get("/get-your-pannel/:id", getYourPannel);
router.post("/post-user", newUser);
router.post("/post-calc-info/:id", calcInfo);
router.post("/post-info/:id", newInfo);
router.post("/post-time-to-payback/:id", payback);


router.get("*", ( req , res ) => {
    res.status(400).json({ 
        status: 400,
        message: "Endpoint not found!"
    });
});

module.exports = router;