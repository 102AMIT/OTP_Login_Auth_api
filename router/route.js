import { Router } from "express";
const router=Router();


// POST method 

// for register the user
router.post('/register',(req,res)=>{
    res.json('register route');
});
// for send the email
router.post('/registerMail',(req,res)=>{
    res.json('registerMail route');
});
// authenticate user
router.post('/authenticate',(req,res)=>{
    res.json('authenticate route');
});
// login in app
router.post('/login',(req,res)=>{
    res.json('login route');
});



// GET Methods
// user with username
router.get('/user/:username',(req,res)=>{

});
// generate random otp
router.get('/generateOTP',(req,res)=>{

});
// verify generated OTP
router.get('/verifyOTP',(req,res)=>{

});

// reset all the variables
router.get('/createResetSession',(req,res)=>{

});

// PUT Methods

// to update the user profile
router.put('/updateuser');

// to use for reset the password
router.put('/resetPassword');

export default router;