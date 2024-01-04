const { User, isMailUsed } = require('../../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { log } = require('console');

const saltRounds = 10;


router.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../public', 'signup.html'));
    res.send("api/auth route");
})




async function hashPassword(password) {
    // throw new Error('Intentional error');
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err) {
        console.error(err);
    }

}

async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }
    catch (err) {
        console.error(err);
    }
}


router.post('/signup', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        console.log(req.body);
        if (!username || !email || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const hashedPassword = await hashPassword(password);
        const userData = {
            username: username,
            email: email,
            password: hashedPassword
        }

        if (await isMailUsed(email)) {
            res.status(409).json({ error: 'Email is already in use' });
            return;
        }

        const newUser = new User(userData);
        console.log(newUser);


        const savedUser = await newUser.save();
        console.log(`saved user : ${savedUser}`);


        res.status(200).json({ message: "User saved successfully" });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log("hi");
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const userFetched = await User.findOne({ email: email });
        if (!userFetched) {
            res.status(409).json({ error: 'Email not registered' });
            return;
        }


        const passwordMatched = await bcrypt.compare(password, userFetched.password);

        if (!passwordMatched) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = await jwt.sign(userFetched.toJSON(), process.env.JWT_SECRET_KEY);
        console.log(token);

        //send cookie and response
        res.cookie('token', token);
        // res.status(200).json({ message: "User successfully logged in" });
        res.redirect('/');

    }
    catch {

    }
})

module.exports = router;