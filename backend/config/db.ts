// backend/config/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const ConnectToMongoDb = async (): Promise<void> => {
    try {
        const mongoURL = process.env.mongoDBurl;
        if (!mongoURL) {
            throw new Error("MongoDb Url is not in your environment variables");
        }

        // Wait for the connection
        await mongoose.connect(mongoURL);
        console.log("✅ mongodb connected successfully");
    } catch (error) {
        console.error("❌ Server error In mongoDb connection:", error);
        process.exit(1); // Stop the server if DB fails
    }
}

export default ConnectToMongoDb;