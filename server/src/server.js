const express = require("express");
const morgan = require("morgan");

const port = 3001;
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const isLoggedIn = (req, res, next) => {
    console.log('middleware hitted');
    const login = true;
    if (login) {
        req.body.id=2001;
        console.log('user verified');
        next();
    }
    else{
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
})




app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
});

