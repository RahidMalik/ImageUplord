import { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import { ImageGallery } from "./components/ImageGallery";

const App = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center space-y-1">
          <h1 className="text-3xl font-bold">☁️ Image Upload App</h1>
          <p className="text-gray-600">
            Upload & manage images with Cloudinary
          </p>
        </header>

        <ImageUpload onUploadSuccess={() => setRefresh(p => p + 1)} />
        <ImageGallery refresh={refresh} />

        <footer className="text-center text-sm text-gray-500">
          MERN + TypeScript + Tailwind CSS 💜
        </footer>
      </div>
    </div>
  );
};

export default App;
