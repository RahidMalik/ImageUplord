import { Request,Response } from "express";
import cloudinary from "../config/cloudinary";
import image from "../models/image";
import { MulterRequest, CloudinaryUploadResult, ApiResponse } from "../types/index";


export const uplordImage = async (
    req: MulterRequest,
    res: Response
): Promise<void> => {
    try {

        // if file in not uplorded
        if (!req.file) {
            res.status(401).json({
                success: false,
                error: 'No file uploaded'
            } as ApiResponse);
            return;
        }
        // result of file uplorder
        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'mern-uploads',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        }
                        else if (!result) reject(new Error("Upload failed"));
                        else {
                            resolve(result as CloudinaryUploadResult)
                        }
                    }
                );
                uploadStream.end(req.file!.buffer);
            }
        );
        // Save Url in DataBase 
        const newImage = new image({
            imageUrl: result.secure_url,
            publicId: result.public_id
        });
        await newImage.save();
        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: newImage
        } as ApiResponse);

    } catch (error) {
        console.error("Uplord Error", error)
        res.status(500).json({
            success: false,
            error: 'FailFed to upload image'

        } as ApiResponse)
    };
};

// GET ALL IMAGES
export const getAllimages = async (req: Request, res: Response): Promise<void> => {
    try {
        const Allimages = await image.find().sort({ uploadedAt: -1 });
        res.status(200).json({
            success: true,
            count: Allimages.length,
            data: Allimages
        } as ApiResponse);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch images'
        } as ApiResponse);
    }
};

// DELETE IMAGES BY ID
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const images = await image.findById(id);

        if (!images) {
            res.status(404).json({
                success: false,
                error: 'Image not found'
            } as ApiResponse);
            return;
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(images.publicId);

        // Delete from MongoDB
        await image.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        } as ApiResponse);
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete image'
        } as ApiResponse);
    }
};