import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import SubmitBtnLoader from "../loaders/SubmitBtnLoader";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Blog states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);  // Changed from "" to []
  const [tagInput, setTagInput] = useState(""); 
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to add a tag when user presses Space or Enter
  const addTag = () => {
    const formattedTag = tagInput.trim().replace(/^#/, ""); // Remove leading #
    if (formattedTag && !tags.includes(formattedTag)) {
      setTags([...tags, formattedTag]);
    }
    setTagInput(""); // Clear input field
  };

  // Function to remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag input change
  const handleTagInputChange = (e) => {
    let value = e.target.value;

    // If user presses space or enter, add tag
    if (value.endsWith(" ") || e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else {
      setTagInput(value);
    }
  };

  // Blog image preview handler
  const blogImageHandler = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setBlogImagePreview(fileReader.result);
        setBlogImage(file);
      };
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch single blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/blog/single-blog/${id}`,
          { withCredentials: true }
        );

        setTitle(data?.blog?.title || "");
        setCategory(data?.blog?.category || "");
        setTags(Array.isArray(data?.blog?.tags) ? data.blog.tags : []);  // Ensure it's always an array
        setDescription(data?.blog?.description || "");
        setBlogImagePreview(data?.blog?.blogImage?.url || "");
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(tags)); 
      if (blogImage) formData.append("blogImage", blogImage); // Only append if changed

      await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/update/${id}`,
        formData,
        { withCredentials: true }
      );

      toast.success("Blog updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog. Please check all fields.");
    }
    setLoading(false);
  };

  return (
    <div className="z-10 flex justify-center py-6">
      <div className="rounded-md shadow-lg bg-slate-50 p-4 space-y-5">
        <h1 className="text-xl font-bold pt-4">Update Blog Details</h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          {/* Title */}
          <div>
            <label htmlFor="title" className="text-gray-400 font-medium px-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Title"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-gray-400 font-medium px-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Category"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-gray-400 font-medium px-1">Tags</label>
            <input
              type="text"
              placeholder="Type #tag and press Space or Enter"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputChange}
              className="w-full border-2 rounded-md px-2 py-1"
            />
          <div className="mt-2">
  {tags.flat().map((tag, index) => (
    <span
      key={index}
      className="mr-2 mb-2 px-3 py-1 border text-gray-500 rounded-lg inline-flex items-center"
    >
      #{tag}
      <button
        type="button"
        onClick={() => removeTag(tag)}
        className="ml-2 "
      >
        ×
      </button>
    </span>
  ))}
</div>

          </div>

          {/* Image Preview */}
          {blogImagePreview && (
            <div className="w-36 h-40 rounded-md overflow-hidden mx-auto my-2">
              <img src={blogImagePreview} alt="Blog Preview" />
            </div>
          )}

          {/* Upload Image */}
          <div>
            <label htmlFor="uploadBlogImage" className="text-gray-400 font-medium px-1">
              Upload Blog Image
            </label>
            <input
              type="file"
              onChange={blogImageHandler}
              className="w-full border-2 rounded-md px-2 py-1"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-gray-400 font-medium px-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full border-2 rounded-md px-2 py-1 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Write about the blog in detail"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="relative bg-blue-500 text-white px-6 py-2 rounded-md">
            {loading ? <SubmitBtnLoader /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
