import { Request } from "express"

export interface IImage {
    imageUrl: string;
    publicId: string;
    uploadAt?: Date;
}

export interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    [key: string]: any;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
}