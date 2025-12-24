import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import ConnectToMongoDb from "./config/db";
import ImageRoutes from "./routers/images.route";


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:5173"
    ]
}));

// Routes
app.use("/api", ImageRoutes);

// Health Check 
app.get("/", (req: Request, res: Response) => {
    res.json({
        message: 'Image Upload API is running'
    })
});

const PORT = parseInt(process.env.PORT || "5000", 10);
// Connect To Database
const startServer = async () => {
    try {
        // 1. Wait for Database
        await ConnectToMongoDb();
        // 3. Start Express
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
    }
};

startServer();