import express from 'express';
import dotenv from 'dotenv';
// import mongooseConnection, { store } from './config/mongoose_connection.js';
import mongoose from 'mongoose';
const app = express();
dotenv.config();
const port = process.env.PORT;
const dburl = process.env.MONGODB_ATLUS_URL;

try{
    mongoose.connect(dburl);
    console.log("connected");
} catch( err ){
     console.log(err);
}

app.get('/', (req, res) => {
    res.send("Yash Rajput");
})

app.listen(port, () =>{
    console.log(`Listening on port: ${port}`);
});
