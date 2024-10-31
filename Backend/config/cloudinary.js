import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadImage(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    public_id: Date.now(), // Optional: you can keep this to assign a unique public_id based on timestamp
  });
  return res;
}

async function deleteImage(publicId) {
  const res = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image", // Adjust if needed (e.g., 'video' for videos)
  });
  return res;
}

export default {
  uploadImage,
  deleteImage
};
