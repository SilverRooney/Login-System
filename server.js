//modules required
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser')
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

//route
const router = require('./router');

//instance variable of express
const app = express();

//port
const port = process.env.PORT || 3000;

//parsing
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

//safety?
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

//route
app.use('/route', router);

//home route
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
})

//port listening
app.listen(port, () => { console.log("Listening on the server on http://localhost:3000") })