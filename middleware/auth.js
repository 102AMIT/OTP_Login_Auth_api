import jwt from 'jsonwebtoken'

/* auth middleware */
export default async function auth(req, res, next) {
    try {
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details to the logged in user
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        res.status(401).json({ error: "Authentication Failed..!" });
    }
}

export function localVaribales(req, res, next) {
    // by this we can access local varibale
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}