import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import userRoute from './routes/user_route.js'
import blogRoute from './routes/blog_route.js'
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

// define session options
const sessionOptions = {
    secret: "secret code",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 28 * 24 * 60 * 60 * 1000,
    maxAge: 28 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    } 
}

//MIDDLEWARES
app.use(session(sessionOptions));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin:[process.env.FRONTEND_URL],
    origin: "https://breezblogs.vercel.app",
    // origin: "https:git //breezblogs.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//MONGODB CONNECTION
const port = process.env.PORT;
const dburl = process.env.MONGODB_ATLUS_URL;
async function dbConnection() {

    try{
        await mongoose.connect(dburl);
        console.log("connected");
    } catch( err ){
        console.log(err);
    }
    app.listen(port, () =>{
        console.log(`Listening on port: ${port}`);
    });
}
dbConnection();

// ROUTES
app.use("/user", userRoute);
app.use("/blog", blogRoute);

