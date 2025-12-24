import type { ImageType } from "../types";
import { deleteFile } from "../services/api";
import { useState } from "react";

interface ImagaCardProps {
    image: ImageType;
    onDelete: (id: string) => void;
}

const ImageCard = ({ image, onDelete }: ImagaCardProps) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Delete this image?")) return;
        try {
            setLoading(true);
            await deleteFile(image._id);
            onDelete(image._id);
        } catch (error) {
            alert("Delete failed");
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <img src={image.imageUrl}
                alt="uploraded"
                className="w-full h-40 object-cover"
            />
            <div className="p-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {new Date(image.uploadAt).toLocaleTimeString()}
                </span>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="text-red-500 text-sm hover:underline disabled:opacity-50"
                >
                    {loading ? "Deleting..." : "🗑 Delete"}
                </button>
            </div>

        </div>
    )
};

export default ImageCard;