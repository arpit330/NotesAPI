const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const jwtSecretKey = "HI BRO";

async function ValidateJWTtoken(req, res, next) {
    if (!req.cookies) {
        console.log('Token Not found');
        res.redirect('/signup');
    }
    const token = req.cookies.token;

    try {
        const decodedResult = await jwt.verify(token, jwtSecretKey);
        console.log(decodedResult);
        req.userId = decodedResult._id;
        next();
    }
    catch (err) {
        res.status(401).json({ message: err.message });
        next();
    }

}

module.exports = ValidateJWTtoken;