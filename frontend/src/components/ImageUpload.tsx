import { useState, useRef, type ChangeEvent } from "react";
import { UplordImage } from "../services/api";

interface ImageUploadProps {
    onUploadSuccess: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setError('');
        }
    };

    const handleUplord = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            setLoading(true);
            await UplordImage(formData);

            // Reset everything
            setFile(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

            onUploadSuccess();
        } catch (error) {
            console.error(error);
            setError("Upload failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">📤 Upload Image</h2>


            <div className="w-full">
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {/* Icon */}
                        <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="text-sm text-gray-500 font-semibold">Click to select an image</p>
                    </div>

                    {/* The Hidden Input */}
                    <input
                        id="file-upload"
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            {/* --- FIX END --- */}

            {/* Preview Section */}
            {preview && (
                <div className="relative mt-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                        onClick={() => {
                            setFile(null);
                            setPreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow hover:bg-red-600"
                    >
                        ✕
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-1">
                        Selected: {file?.name}
                    </p>
                </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                onClick={handleUplord}
                disabled={loading || !file}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Uploading..." : "🚀 Upload to Cloudinary"}
            </button>
        </div>
    );
};

export default ImageUpload;