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
    origin:[
        "http://localhost:3000" 
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

// Connect To Database
ConnectToMongoDb();

// App listen
const PORT = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
})