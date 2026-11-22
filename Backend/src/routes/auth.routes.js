const express=require('express');
const authController=require('../controllers/auth.controller')
const authRouter=express.Router();
const authmiddleware=require('../middleware/auth.middleware')

authRouter.post('/register',authController.registerUserController)

/**
 * @route post/api/auth/login
 * 
 */
authRouter.post("/login",authController.loginUserController)


authRouter.get("/logout",authController.logoutUserController)


authRouter.get("/get-me",authmiddleware.authUser,authController.getMeController)


module.exports=authRouter