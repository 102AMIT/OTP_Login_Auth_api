import { Router } from "express";
const router=Router();


// import all controller 
import * as controller from '../controllers/appController.js';

// POST methods*******************

// for register the user
router.post('/register',controller.register);
   
// for send the email
// router.post('/registerMail',(req,res)=>{
//     res.json('registerMail route');
// });

// authenticate user
router.post('/authenticate',(req,res)=>{
    res.end();
});

// login in app
router.post('/login',controller.login);

// GET Methods*************

// user with username
router.get('/user/:username',controller.getUser);

// generate random otp
router.get('/generateOTP',controller.generateOTP);

// verify generated OTP
router.get('/verifyOTP',controller.verifyOTP);

// reset all the variables
router.get('/createResetSession',controller.createResetSession);



// PUT Methods*******************

// to update the user profile
router.put('/updateuser',controller.updateUser);

// to use for reset the password
router.put('/resetPassword',controller.resetPassword);



export default router;