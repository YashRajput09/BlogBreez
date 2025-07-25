import mongoose from "mongoose";
// import dotenv from 'dotenv';
import dbgr from "debug";
import mongoStore from "connect-mongo";
const debugMongoose = dbgr("development:mongoose");

const dbUrl = process.env.MONGODB_ATLUS_URL;
mongoose
  .connect(dbUrl,{
      connectTimeoutMS: 30000 //30 seconds connection timeout
    })
  .then(() => {
    debugMongoose("connected");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDB : ", error);
  });

const store = mongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

export { store };
export default mongoose.connection;