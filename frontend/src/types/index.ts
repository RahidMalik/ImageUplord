export interface ImageType {
    _id: string;
    imageUrl: string;
    public_id: string;
    uploadAt: string;
};

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    count?: number;
};

export interface UplordResponse extends ApiResponse {
    data: ImageType;
};

export interface ImagesResponse extends ApiResponse {
    data: ImageType[];
};