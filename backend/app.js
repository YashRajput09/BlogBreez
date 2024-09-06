import express from 'express';
import dotenv from 'dotenv';
// import mongooseConnection, { store } from './config/mongoose_connection.js';
import mongoose from 'mongoose';
import userRoute from './routes/user_route.js'
const app = express();
dotenv.config();

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

app.use('/user', userRoute);


