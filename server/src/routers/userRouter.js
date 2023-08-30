const express = require("express");
const { getUsers, getUser } = require("../controllers/userController");
const userRouter = express.Router();




// userRouter.get('/api/user', isLoggedIn,reteLimiter, (req, res) => {
//     console.log(req.body.id);
//     res.status(200).send({ name: "siyamul", email: 'siyamul.cse@gmail.com' });
// });
// GET: api/users
userRouter.get('/', getUsers );
userRouter.get('/:id', getUser );

module.exports = userRouter;