const express = require('express');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const ValidateJWTtoken = require('./middlewares/validate');

const rateLimiter = require('./middlewares/rateLimiter');
app.use(rateLimiter);

require('dotenv').config();
const authRoute = require('./api/auth/authRoute')
const notesRoute = require('./api/notes/notesRoute');
const searchRoute = require('./api/search/searchRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT;


// DATABASE CONNECT
mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});



app.get('/', ValidateJWTtoken, async (req, res) => {
    res.send("Hello");

})


app.use('/api/auth', authRoute);
app.use('/api/notes', ValidateJWTtoken, notesRoute);
app.use('/api/search', ValidateJWTtoken, searchRoute);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});



// curl -X GET \
//      --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk1YTE3OTAyNjRmMTFjZTAwZWNjNjAiLCJ1c2VybmFtZSI6ImFycGl0IiwiZW1haWwiOiJhcnBpdEBuc3NuZGZhIiwicGFzc3dvcmQiOiIkMmIkMTAkRVcwNENiWUNpYlhJZkdZQm41cXh2T0xXcWo2a0lTZVdkd1ZLb1NuVWNSZWUyRG1Ga1FONGEiLCJfX3YiOjAsImlhdCI6MTcwNDMwNTI1MX0.oILekVlNvT6Lh4XKVE-BeC8wYnroKwj3-EJwQ5eh2Wc" \
//      http://localhost:3000/api/notes/


// curl -X POST \
// -H "Content-Type: application/json" \
// -d '{"title":"first note","content":"new note from arpit"}' \
// --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk1YTE3OTAyNjRmMTFjZTAwZWNjNjAiLCJ1c2VybmFtZSI6ImFycGl0IiwiZW1haWwiOiJhcnBpdEBuc3NuZGZhIiwicGFzc3dvcmQiOiIkMmIkMTAkRVcwNENiWUNpYlhJZkdZQm41cXh2T0xXcWo2a0lTZVdkd1ZLb1NuVWNSZWUyRG1Ga1FONGEiLCJfX3YiOjAsImlhdCI6MTcwNDMwNTI1MX0.oILekVlNvT6Lh4XKVE-BeC8wYnroKwj3-EJwQ5eh2Wc" \
// http://localhost:3000/api/notes/

// curl -X POST \
// -H "Content-Type: application/json" \
// -d '{"username":"arpit","email":"arpit@nssndfa","password":"123asdf"}' \
// http://localhost:3000/signup

// curl -X POST \
// -H "Content-Type: application/json" \
// -d '{"email":"arpit@nssndfa","password":"123asdf"}' \
// http://localhost:3000/login
