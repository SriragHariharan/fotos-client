import { useState } from "react";
import UploadCard from "../components/UploadCard";
import axiosInstance from "../axios/axios";

function Upload() {
  const [imagesMetadata, setImagesMetadata] = useState<{ image: File; title: string; imageURL: string; album: string }[]>([]);
  const [images, setImages] = useState<File[]>([]); // Change to an array
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("Kashmir diaries");

  const handleAddToUploadList = () => {
    if (images.length === 0 || !title.trim()) return; // Check for album name
    const newImagesMetadata = images.map((image) => ({
      imageURL: URL.createObjectURL(image),
      title,
      image,
      album,
    }));
    setImagesMetadata([...imagesMetadata, ...newImagesMetadata]); // Include new images in metadata
    setImages([]); // Reset images
    setTitle("");
  };

  // Upload to server
  const handleUpload = async () => {
    try {
      console.log(imagesMetadata)
      if (imagesMetadata.length === 0) return;
      console.log("Form submitted...");

      const formData = new FormData();
      formData.append("albumName", album);
      imagesMetadata.forEach((imageMetadata) => {
        formData.append("images", imageMetadata.image);
        formData.append("title", imageMetadata.title);
      });
      axiosInstance.post("/album/create", formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
        .then((response) => {
          console.log("from server::: ",response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } 
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#890000] mb-6">Upload Images</h1>

      {/* Preview */}
      {images.length > 0 && (
        <div className="mb-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-xl shadow border border-gray-200"
            />
          ))}
        </div>
      )}

      {/* Form Inputs */}
      <div className="w-full max-w-md space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter album name"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
        />
        <input
          type="file"
          accept="image/jpeg, image/png"
          multiple // Allow multiple file selection
          onChange={(e) => setImages(Array.from(e.target.files || []))} // Convert FileList to array
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#890000] file:text-white hover:file:bg-[#6f0000]"
        />
        <input
          type="text"
          placeholder="Enter image caption"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#890000]"
        />
        <button
          onClick={handleAddToUploadList}
          className="w-full bg-[#890000] text-white py-2 rounded-xl font-semibold hover:bg-[#6f0000] transition-colors"
        >
          Add to Upload List
        </button>
      </div>

      {/* Divider */}
      <hr className="w-full max-w-md border -t border-gray-300 mb-6" />

      {/* Upload List */}
      <div className="w-full max-w-4xl mx-auto">
        {imagesMetadata.map(({ image, title }, index) => (
          <UploadCard
            image={image}
            imageURL={URL.createObjectURL(image)}
            title={title}
            key={index}
            id={index}
            onDelete={() =>
              setImagesMetadata((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>

      {/* Upload and Cancel buttons */}
      <div className="flex justify-between w-full max-w-md mt-8 gap-4">
        {imagesMetadata.length > 0 && (
          <button
            onClick={handleUpload}
            className="w-full bg-[#890000] text-white py-2 rounded-xl font-semibold hover:bg-[#6f0000] transition-colors cursor-pointer"
          >
            Upload
          </button>
        )}
        <button
          onClick={() => setImagesMetadata([])}
          className="w-full border border-[#890000] text-[#890000] py-2 rounded-xl font-semibold hover:bg-[#890000] hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Upload;