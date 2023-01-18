import UserModel from '../model/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';


/* middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == 'GET' ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}


/* // POST: http://localhost:8000/api/register
"username":"Amit1234",
"password":"1234",
"email":"a@gmail.com",
"firstName":"Amit",
"lastName":"Thakur",
"mobile":"123456789",
"address":"kolkata",
"profile":""
} */
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;
        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err));
                if (user) reject({ error: "Please use unique username" });

                resolve();
            })
        });
        // check the existing Email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err));
                if (email) reject({ error: "Please use unique username" });

                resolve();
            })
        });
        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10).then(hashedPassword => {
                        const user = new UserModel({
                            username,
                            password: hashedPassword,
                            profile: profile || '',
                            email
                        });
                        // return save result as a response
                        user.save()
                            .then(result => res.status(201).send({ message: "User Register Successfully" }))
                            .catch(error => res.status(500).send({ error }));
                    }).catch(error => {
                        return res.status(500).send({
                            error: "Enable to hashed password"
                        })
                    })
                }
            }).catch(error => {
                return res.status(500).send({ error });
            });
    } catch (error) {
        return res.status(500).send(error);
    }
}


/* // POST : http://localhost:8000/api/login
{
    "username":"Amit1234",
    "password":"1234",
} */
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token 
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username,
                        }, process.env.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not found" });
            })
    } catch (error) {
        return res.status(500).send({ error });
    }
}


// GET : http://localhost:8000/api/user/example123
export async function getUser(req, res) {
    const { username } = req.params;

    try {

        if (!username) return res.status(501).send({ error: "Invalid Username" });

        UserModel.findOne({ username }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Could not find user" });

            return res.status(201).send(user);
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot find User Data" })
    }
}


// PUT : http://localhost:8000/api/updateuser
export async function updateUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            // update the user
            UserModel.updateOne({ _id: userId }, body, function (err, data) {
                if (err) throw err;
                return res.status(201).send({ message: "User Updated...!" });
            })
        } else {
            return res.status(401).send({ error: "User Not Found...!" });

        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}


// GET : http://localhost:8000/api/generateOTP
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    res.status(201).send({ code: res.app.locals.OTP });
}


// GET : http://localhost:8000/api/verifyOTP
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; //reset the OTP value
        req.app.locals.resetSession = true; //start session for reset password
        return res.status(201).send({ msg: 'Verify OTP Successfully!' });
    }
    return res.status(400).send({ error: "Invalid OTP" });
}


// Successfully redirect user when OTP is valid
// GET : http://localhost:8000/api/createResetSession
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession });
    }
    return res.status(404).send({ error: "Session expired!" });
}

// update the password when we have valid session
// PUT : http://localhost:8000/api/resetPassword
export async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(404).send({ error: "Session expired!" });

        const { username, password } = req.body;

        try {

            UserModel.findOne({ username })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username: user.username }, { password: hashedPassword }, function (err, data) {
                                if (err) throw err;
                                req.app.locals.resetSession = false; //reset session
                                return res.status(201).send({ message: "Record Updated...!" });
                            })
                        })
                        .catch(error => {
                            return res.status(500).send({ error: "Enable to hashed Password" });
                        })
                })
                .catch(error => {
                    return res.status(400).send({ error: "Username not found" });
                })

        } catch (error) {
            return res.status(500).send({ error });
        }

    } catch (error) {
        return res.status(400).send({ error });
    }
}
