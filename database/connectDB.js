import mongoose from "mongoose";
 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connencted to db");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB
