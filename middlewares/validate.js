const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function ValidateJWTtoken(req, res, next) {
    if (!req.cookies.token) {
        console.log('Token Not found');
        return res.redirect('/api/auth/signup');

    }
    const token = req.cookies.token;

    try {
        const decodedResult = await jwt.verify(token, jwtSecretKey);
        console.log(decodedResult);
        req.userId = decodedResult._id;
        return res.redirect('/api/notes');
    }
    catch (err) {
        res.status(401).json({ message: err.message });
        // next();
    }

}

module.exports = ValidateJWTtoken;