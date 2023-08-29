const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const createError = require('http-errors')
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const isLoggedIn = (req, res, next) => {
    console.log('middleware hitted');
    const login = true;
    if (login) {
        req.body.id = 2001;
        console.log('user verified');
        next();
    }
    else {
        return res.status(401).send('false information');
    }
}


app.get('/api/user', isLoggedIn, (req, res) => {
    console.log(req.body.id);
    res.status(200).send({ name: "siyamul", email: 'siyamul.cse@gmail.com' })
});

app.get("/test", (req, res) => { res.send("Welcome - API is working..."); });
app.get("/", (req, res) => {
    res.send('Welcome ROOT');
});

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
    console.error(err.stack);
    res.status(500).json({ message: "Something broken!" });
    
});


module.exports =app;