import React from "react";

const useUpload = async ({ image, onUploadProgress }) => {

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append(
        "api key",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_API_KEY
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
        withCredentials: false,
      };

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`
      );

      const data = res.data;
      if(!data) return console.log("Image upload failed")

        return data
    } catch (error) {
        return error.message;
    }
  };

   const { public_id, secure_url } = await upload();
   return {public_id, secure_url};
};

export default useUpload;
