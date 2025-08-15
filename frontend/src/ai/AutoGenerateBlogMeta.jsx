import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AutoGenerateBlogMeta() {
  const [autoMetaLoading, setAutoMetaLoading] = useState(false);

  const generateMetadata = async (imageFile, onSuccess) => {
    if (!imageFile) {
      toast.error("Please upload an image first.");
      return;
    }

    setAutoMetaLoading(true);
    try {
      const formData = new FormData();
      formData.append("blogImage", imageFile);

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/auto-meta`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onSuccess(data);
      toast.success("Metadata generated! Review before posting.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate metadata.");
    }
    setAutoMetaLoading(false);
  };

  return { autoMetaLoading, generateMetadata };
}
