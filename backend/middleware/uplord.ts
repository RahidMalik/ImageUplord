import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
): void => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
    console.log(req.method);
};

const uplord = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
});

export default uplord;