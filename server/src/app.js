const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();
// API security to prevent DDos Attack
const reteLimiter = rateLimit({windowMs:1*60*1000,max:5, message: "too many requests! try later..."}) ; //1 min= 1* 60s *1000ms
// app.use(reteLimiter); //use url hit limit middleware for all route 
const isLoggedIn = (req, res, next) => {
    console.log('middleware hitting');
    const login = true;
    if (login) {
        req.body.id = 2001;
        console.log('user verified');
        next();
    }
    else return res.status(401).send('false information');
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
// Apply isLoggedIn middleware for all routes below this line
// app.use(isLoggedIn);
app.use('/api/user',userRouter);
app.use('/api/seed',seedRouter);


app.get("/test",(req, res) => { res.send("Welcome - API is working..."); });
app.get("/", (req, res) => { res.send('Welcome dear');});

// client error handling
app.use((req, res, next) => { 
    next( createError(404, 'your route not found'));
});
// server error handling- if missing any error handel
app.use((err,req, res, next) => {
    return res.status(err.status || 500).json({
        success:false,
        message: err.message 
    })
});

module.exports =app;