import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import SubmitBtnLoader from "../loaders/SubmitBtnLoader";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // Array to store tags
  const [tagInput, setTagInput] = useState(""); // Input field for a single tag
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to add tag when user types with #
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

  const blogImageHandler = (e) => {
    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setBlogImagePreview(fileReader.result);
      setBlogImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      // Corrected line: Use "tags" instead of "tags[]"
      tags.forEach((tag) => formData.append("tags", tag));
      formData.append("blogImage", blogImage);
  
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/create`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      // Reset form and show success message
      toast.success("Blog created successfully");
      setTitle("");
      setCategory("");
      setDescription("");
      setTags([]);
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog");
    }
    setLoading(false);
  };

  return (
    <div className="sm:absolute left-16 w-full flex justify-center py-6">
      <div className="rounded-md shadow-lg bg-slate-50 p-4 space-y-5">
        <h1 className="text-xl font-bold pt-4">Create new Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label className="text-gray-400 font-medium px-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Title"
            />
          </div>
          <div>
            <label className="text-gray-400 font-medium px-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Category"
            />
          </div>

          {/* Tag Input */}
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
              {tags.map((tag, index) => (
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
            <div className="w-36 h-40 rounded-md overflow-hidden profileImage mx-auto my-2">
              <img src={blogImagePreview} alt="Preview" />
            </div>
          )}

          <div>
            <label className="text-gray-400 font-medium px-1">
              Upload Blog Image
            </label>
            <input
              type="file"
              onChange={blogImageHandler}
              className="w-full border-2 rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label className="text-gray-400 font-medium px-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full border-2 rounded-md px-2 py-1 focus:border-blue-400 focus:ring-blue-400"
              placeholder="Write about blog in detail"
            ></textarea>
          </div>
          <button
            className="relative bg-blue-500 text-white px-6 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? <SubmitBtnLoader /> : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
