import { IImage } from "../types";
import mongoose, { Document, Schema } from "mongoose";

export interface IImageDocument extends IImage, Document { }

const imageSchema = new Schema<IImageDocument>({
    imageUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


export default mongoose.model("image", imageSchema)