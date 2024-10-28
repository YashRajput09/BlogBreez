import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

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

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("blogImage", blogImage);
     const {data} = await axios.post("http://localhost:3000/blog/create", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.success("Blog created successfully");
      setTitle("");
      setCategory("");
      setDescription("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error("Faild to create blog")
    }
  };

  return (
    <div className="sm:absolute left-16 w-full flex justify-center py-6">
      <div className="rounded-md  shadow-lg bg-slate-50 p-4 space-y-5">
        <h1 className="text-xl font-bold pt-4">Create new Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="title" className="text-gray-400 font-medium px-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Title"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-gray-400 font-medium px-1"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 rounded-md px-2 py-1"
              placeholder="Category"
            />
          </div>

              {/*check if imagePreview have value then show div otherwise hide div  */}
          {blogImagePreview && (
            <div className="w-36 h-40 rounded-md overflow-hidden profileImage mx-auto my-2">
              <img
                src={blogImagePreview ? `${blogImagePreview}` : "Image Preview"}
                alt="Img"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="uploadBlogImage"
              className="text-gray-400 font-medium px-1"
            >
              Upload Blog Image
            </label>
            <input
              type="file"
              name="uploadBlogImage"
              onChange={blogImageHandler}
              className="w-full border-2 rounded-md px-2 py-1"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-gray-400 font-medium px-1"
            >
              Description
            </label>
            <textarea
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              className="w-full border-2 rounded-md px-2 py-1 focus:border-blue-400 focus:ring-blue-400"
              id="desctiption"
              placeholder="Write about blog in detail"
            ></textarea>
          </div>
          <button className="relative  bg-blue-500 text-white px-6 py-2 rounded-md">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
