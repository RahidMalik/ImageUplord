import express, { Router } from "express";
import { getAllimages, uplordImage, deleteImage } from "../controllers/imageController";
import uplord from "../middleware/uplord";

const router: Router = express.Router();

// router
router.post("/upload", uplord.single("image"), uplordImage);
router.get("/images", getAllimages);
router.delete("/images/:id", deleteImage);

export default router;