// Cloudinary configuration
// You need to create a free account at https://cloudinary.com
// and replace these values with your own

export const CLOUDINARY_CONFIG = {
  cloudName: "YOUR_CLOUD_NAME", // Replace with your Cloudinary cloud name
  uploadPreset: "YOUR_UPLOAD_PRESET", // Replace with your upload preset name
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

// Function to convert base64 to file
export const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
