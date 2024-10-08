import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import userRoute from './routes/user_route.js'
import blogRoute from './routes/blog_route.js'
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
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
app.use('/user', userRoute);
app.use("/blog", blogRoute);

