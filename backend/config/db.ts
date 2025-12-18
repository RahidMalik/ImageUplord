import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


const ConnectToMongoDb = async ():Promise<any> => {
try {
    const mongoURL= process.env.mongoDBurl

    if(!mongoURL){
        throw new Error("MongoDb Url are not in your veriable")
    }
    await mongoose.connect(mongoURL)
    console.log("mongodb connected successfully")

} catch (error) {
    console.error("Server error In mongoDb connection")
}
}

export default ConnectToMongoDb;