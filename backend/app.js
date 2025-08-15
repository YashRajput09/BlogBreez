import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import userRoute from './routes/user_route.js'
import blogRoute from './routes/blog_route.js'
import cookieParser from 'cookie-parser';
import cors from "cors";
import dashboardRoute from './routes/dashboard_route.js'
import recommadedRoute from './routes/recommendation_route.js';
import autoMetaRoutes from './routes/autoMeta_routes.js'
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
    'http://localhost:3000',
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

// Express-fileupload middleware for normal uploads
const fileUploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
});

// MULTER (Only for Gemini image-processing routes)
const storage = multer.memoryStorage();
export const upload = multer({ storage }); // export for use in routes

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
app.use("/user", fileUploadMiddleware, userRoute);
app.use("/user/dashboard",fileUploadMiddleware, dashboardRoute)
app.use("/blog", fileUploadMiddleware, blogRoute);
app.use("/blog/recommanded", fileUploadMiddleware, recommadedRoute);
app.use("/api/auto-meta", upload.single("blogImage"), autoMetaRoutes)

