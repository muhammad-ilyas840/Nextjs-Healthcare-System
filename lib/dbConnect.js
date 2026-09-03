import mongoose from "mongoose";

const dbConnect = async () => {
    await mongoose.connect(process.env.Mongodb_url);
};

export default dbConnect;