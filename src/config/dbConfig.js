import mongoose from "mongoose";

const connectDb = () => {
  try {
    const connStr = "mongodb://localhost:27017/money_management";
    const conn = mongoose.connect(connStr);
    conn && console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
