import axios, { AxiosError } from "axios";
import type { ImagesResponse, ImageType, UplordResponse } from "../types";

const API_URL = "http://localhost:5000/api";

// GET ALL IMAGES
export const getAllimages = async (): Promise<ImageType[]> => {
    try {
        // We tell axios that the response matches the ImagesResponse interface
        const { data } = await axios.get<ImagesResponse>(`${API_URL}/images`);

        // IMPORTANT: We must return data.data because data.data is the ImageType[]
        // If data.data doesn't exist for some reason, return an empty array []
        return data.data || [];
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        throw axiosError?.response?.data || "Getting All Photos Failed";
    }
};

// UPLOAD FILE 
export const UplordImage = async (formData: FormData): Promise<ImageType> => {
    try {
        // Added 'await' here so it actually waits for the upload
        const { data } = await axios.post<UplordResponse>(
            `${API_URL}/upload`, formData
        );
        return data.data;
    } catch (error) {
        console.log(error);
        const axiosError = error as AxiosError;
        throw axiosError?.response?.data || { error: "Upload failed" };
    }
};

// DELETE IMAGE
export const deleteFile = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/images/${id}`);
    } catch (error) {
        console.log(error)
        const axiosError = error as AxiosError;
        throw axiosError?.response?.data || "Delete Photo Failed";
    }
};