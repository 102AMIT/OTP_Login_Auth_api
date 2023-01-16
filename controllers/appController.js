
// POST
export async function register(req,res){
    res.json('register controller');
}

// POST
export async function login(req,res){
    res.json('login controller');
}

// GET
export async function getUser(req,res){
    res.json('getUser controller');
}

// PUT
export async function updateUser(req,res){
    res.json('updateUser controller');
}

// GET
export async function generateOTP(req,res){
    res.json('generateOTP controller');
}

// GET
export async function verifyOTP(req,res){
    res.json('verifyOTP controller');
}

// Successfully redirect user when OTP is valid
// GET
export async function createResetSession(req,res){
    res.json('createResetSession controller');
}

// PUT
export async function resetPassword(req,res){
    res.json('resetPassword controller');
}
