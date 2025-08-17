import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import SubmitBtnLoader from "../loaders/SubmitBtnLoader";
import useAutoGenerateMeta from "../ai/AutoGenerateBlogMeta"; // <-- NEW import

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [metadataGenerated, setMetadataGenerated] = useState(false);

  const descriptionRef = useRef(null);

  const { autoMetaLoading, generateMetadata } = useAutoGenerateMeta();

  const addTag = () => {
    const formattedTag = tagInput.trim().replace(/^#/, "");
    if (formattedTag && !tags.includes(formattedTag)) {
      setTags([...tags, formattedTag]);
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputChange = (e) => {
    let value = e.target.value;
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
      setMetadataGenerated(false);
    };
  };

  const handleGenerateMeta = () => {
    generateMetadata(blogImage, (data) => {
      setTitle(data.title || "");
      setCategory(data.category || "");
      setDescription(data.description || "");
      setTags(data.tags || []);
      setMetadataGenerated(true);

      setTimeout(() => {
        descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      tags.forEach((tag) => formData.append("tags", tag));
      formData.append("blogImage", blogImage);
      console.log("blogImage", blogImage);

      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/blog/create`,
        formData,
        {
          withCredentials: true,
          // headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Blog created successfully");
      setTitle("");
      setCategory("");
      setDescription("");
      setTags([]);
      setBlogImage("");
      setBlogImagePreview("");
      setMetadataGenerated(false);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create blog");
    }
    setLoading(false);
  };

   return (
    <div className="sm:absolute left-60  flex justify-center w-full md:w-3/4 py-6">
      <div className="rounded-xl shadow-lg bg-white p-4 sm:p-6 space-y-5 w-full max-w-3xl">
        {/* AI Feature Banner */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 flex items-start gap-3">
          <span className="text-xl">✨</span>
          <div className="text-sm">
            <p className="font-semibold text-purple-800">
              New: AI Auto-Meta from Image
            </p>
            <p className="text-purple-700">
              Upload an image and let AI draft your Title, Category, Tags, and
              Description. You can review and edit everything before posting.
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold pt-2">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="text-gray-500 font-medium px-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
              placeholder="Catchy blog title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-gray-500 font-medium px-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
              placeholder="e.g., Travel, Tech, Food"
            />
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500 font-medium px-1">Tags</label>
              <span className="text-xs text-gray-400">
                (type <kbd className="px-1 py-0.5 border rounded">#tag</kbd>{" "}
                then press Space or Enter)
              </span>
            </div>
            <input
              type="text"
              placeholder="Type #tag and press Space or Enter"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputChange}
              className="w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <div className="mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 px-3 py-1 border text-gray-600 rounded-full inline-flex items-center"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                    aria-label={`Remove tag ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">
                Upload Blog Image
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full align-middle">
                  AI-powered
                </span>
              </h2>
            </div>
            <p className="text-sm text-gray-500 -mt-1">
              💡 Tip: Upload your image and click{" "}
              <span className="font-medium">Generate Metadata</span> to let AI
              fill details for you.
            </p>

            <input
              type="file"
              onChange={blogImageHandler}
              className="w-full border-2 rounded-md px-3 py-2"
              accept="image/*"
            />

            {blogImagePreview && (
              <div className="w-44 h-48 rounded-md overflow-hidden mx-auto my-2 border">
                <img
                  src={blogImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Generate Metadata Button (appears only after selecting image) */}
            {blogImage && !metadataGenerated && (
              <button
                type="button"
                onClick={handleGenerateMeta}
                disabled={autoMetaLoading}
                className="group inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-md shadow transition-all hover:bg-purple-700 focus:ring-2 focus:ring-purple-300"
              >
                <span className="text-lg transition-transform group-hover:rotate-12">
                  ✨
                </span>
                {autoMetaLoading ? "Analyzing image..." : "Generate Metadata with AI"}
              </button>
            )}
          </div>

          {/* Description */}
          <div ref={descriptionRef}>
            <label className="text-gray-500 font-medium px-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className="w-full border-2 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
              placeholder="Write about the blog in detail"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            className="relative bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-60"
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
