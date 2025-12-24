import { useEffect, useState } from "react";
import type { ImageType } from "../types";
import { getAllimages } from "../services/api";
import ImageCard from "./ImageCard";


interface ImageGalleryProps {
    refresh: number;
}

export const ImageGallery = ({ refresh }: ImageGalleryProps) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchImages = async () => {
        try {
            setLoading(true);
            const res = await getAllimages();
            setImages(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [refresh]);

    const handleDelete = (id: string) => {
        setImages((prev) => prev.filter(img => img._id !== id));
    };

    if (loading) {
        return <p className="text-center">Loading gallery...</p>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">🖼 Image Gallery</h2>

            {/* 1. First, check if images exists and is actually an array */}
            {!Array.isArray(images) ? (
                <p className="text-red-500">Error: Could not load gallery data.</p>
            ) : images.length === 0 ? (
                /* 2. Then check if the array is empty */
                <p className="text-gray-500">No images uploaded yet</p>
            ) : (
                /* 3. Finally, map only when we are sure it is an array with items */
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img) => (
                        <ImageCard
                            key={img._id}
                            image={img}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


export default ImageGallery;