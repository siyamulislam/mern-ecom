const express = require("express");
const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount, activateUser, updateUserById } = require("../controllers/userController");
const upload = require("../middlewares/fileUpload");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();




// userRouter.get('/api/user', isLoggedIn,reteLimiter, (req, res) => {
//     console.log(req.body.id);
//     res.status(200).send({ name: "siyamul", email: 'siyamul.cse@gmail.com' });
// });
// GET: api/users
userRouter.post('/process-register',upload.single("image"),validateUserRegistration,runValidation,  processRegister );
userRouter.post('/verify', activateUserAccount );
userRouter.get('/activate', activateUser ); // for browser testing purpose 
userRouter.get('/', getUsers );
userRouter.get('/:id', getUserById );
userRouter.delete('/:id', deleteUserById );
userRouter.put('/:id', upload.single("image"),updateUserById );

module.exports = userRouter;