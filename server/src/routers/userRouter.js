const express = require("express");
const { getUsers } = require("../controllers/userController");
const userRouter = express.Router();




// userRouter.get('/api/user', isLoggedIn,reteLimiter, (req, res) => {
//     console.log(req.body.id);
//     res.status(200).send({ name: "siyamul", email: 'siyamul.cse@gmail.com' });
// });

userRouter.get('/', getUsers );

module.exports = userRouter;