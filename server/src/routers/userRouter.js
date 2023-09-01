const express = require("express");
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, activateUser } = require("../controllers/userController");
const upload = require("../middlewares/fileUpload");
const userRouter = express.Router();




// userRouter.get('/api/user', isLoggedIn,reteLimiter, (req, res) => {
//     console.log(req.body.id);
//     res.status(200).send({ name: "siyamul", email: 'siyamul.cse@gmail.com' });
// });
// GET: api/users
userRouter.post('/process-register', upload.single("image"), processRegister );
userRouter.post('/verify', activateUserAccount );
userRouter.get('/activate', activateUser ); // for browser testing purpose 
userRouter.get('/', getUsers );
userRouter.get('/:id', getUserById );
userRouter.delete('/:id', deleteUserById );

module.exports = userRouter;