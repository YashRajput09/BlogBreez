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
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());

const allowedOrigins = [
    'http://localhost:5173',
    'https://breezblogs.vercel.app',
  ];

app.use(cors({
    // origin:'http://localhost:5173',
    // origin: "https://breezblogs.vercel.app",
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
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

