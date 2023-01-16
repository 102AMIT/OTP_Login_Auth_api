import UserModel from '../model/User.js';
import bcrypt from "bcrypt";
import  jwt  from 'jsonwebtoken'

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

// POST : http://localhost:8000/api/login
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
                            msg:"Login Successful...!",
                            username:user.username,
                            token
                        })
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.s
            })
    } catch (error) {
        return res.status(500).send({ error });
    }
}

// GET
export async function getUser(req, res) {
    res.json('getUser controller');
}

// PUT
export async function updateUser(req, res) {
    res.json('updateUser controller');
}

// GET
export async function generateOTP(req, res) {
    res.json('generateOTP controller');
}

// GET
export async function verifyOTP(req, res) {
    res.json('verifyOTP controller');
}

// Successfully redirect user when OTP is valid
// GET
export async function createResetSession(req, res) {
    res.json('createResetSession controller');
}

// PUT
export async function resetPassword(req, res) {
    res.json('resetPassword controller');
}
