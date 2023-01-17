import { Router } from "express";
const router = Router();


// import all controller 
import * as controller from '../controllers/appController.js';
import auth, { localVaribales } from '../middleware/auth.js'
import { registerMail } from '../controllers/mailer.js'


// POST methods*******************
router.post('/register', controller.register);// for register the user
router.post('/registerMail', registerMail);// for send the email
router.post('/authenticate', controller.verifyUser, (req, res) => { res.end(); });// authenticate user
router.post('/login', controller.verifyUser, controller.login);// login in app



// GET Methods*************
router.get('/user/:username', controller.getUser);// user with username
router.get('/generateOTP', controller.verifyUser, localVaribales, controller.generateOTP);// generate random otp
router.get('/verifyOTP', controller.verifyUser,controller.verifyOTP);// verify generated OTP
router.get('/createResetSession', controller.createResetSession);// reset all the variables



// PUT Methods*******************
router.put('/updateuser', auth, controller.updateUser);// to update the user profile
router.put('/resetPassword', controller.verifyUser, controller.resetPassword);// to use for reset the password



export default router;