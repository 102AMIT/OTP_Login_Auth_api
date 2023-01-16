import express from "express";
import cors from 'cors';
// morgan libary use to log http request inside this console
import morgan from "morgan";
import connect from './database/mongoose.js'
import router from './router/route.js'


const app = express();

// middleware
app.use(express.json());
app.use(cors());
// The preset tiny provides the minimal output when logging HTTP requests. 
app.use(morgan('tiny'));
app.disable('x-powered-by');// less hackers know about our stack (Remove the X-Powered-By headers);

const port = 8000;

// HTTP get Request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
})

// api routes 

app.use('/api',router);

// start server only we have databse valid connection 
connect().then(() => {
    try {
        app.listen(port, (err) => {
            if (err) console.log("Error in Backend server start");
            console.log(`Server connected to port :${port}`);
        })

    } catch (err) {
        console.log(`Cannot connect to the server ${err}`)
    }
}).catch(err => {
    console.log(`Invalid database connection... ${err}`)
})

