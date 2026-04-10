import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState === 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB ulandi");
    } catch (error) {
        console.log("DB xato:", error.message);
        throw error;
    }
}
export default connectDB;
