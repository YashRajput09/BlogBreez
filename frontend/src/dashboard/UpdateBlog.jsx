import axios from "axios";
import {useEffect, useState} from 'react'
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";

const UpdateBlog = () => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [blogImage, setBLogImage] = useState("");
    const [blogImagePreview, setBlogImagePreview] = useState("");

    // blogImage preview handler
    const blogImageHandler = (e) => {
      try {
        
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setBlogImagePreview(fileReader.result);
            setBLogImage(file);
        };
      } catch (error) {
        console.log(error);
        
      }
    };

    useEffect(() => {
        // fetch single blog data 
        const fetchBlog = async() => {
            const {data} = await axios.get(`http://localhost:3000/blog/single-blog/${id}`,
                { withCredentials: true,
                    headers: {
                        "Content-Type":"multipart/form-data", 
                    }
                }
                
            )
            console.log(data);
            setTitle(data?.blog?.title);
            setCategory(data?.blog?.category);
            setDescription(data?.blog?.description);
            setBLogImage(data?.blog?.blogImage?.url);
            setBlogImagePreview(data?.blog?.blogImage?.url);
        }
        fetchBlog();

       
    }, [id])
     // handleUpdate function
     const handleUpdate = async (e) =>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("blogImage", blogImage);

            const {data} = await axios.put(`http://localhost:3000/blog/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log(data);
            toast.success("Blog details updated")
            window.location.pathname = "/dashboard";
            
        } catch (error) {
            console.log(error);
            toast.error("Please filll all required fields")
            
        }
    }
    // handleUpdate();
    return (
        <div className="z-10 flex justify-center py-6">
          <div className="rounded-md  shadow-lg bg-slate-50 p-4 space-y-5">
            <h1 className="text-xl font-bold pt-4">Update Blog Details</h1>
            <form  onSubmit={handleUpdate} className="flex flex-col gap-2">
              <div>
                <label htmlFor="title" className="text-gray-400 font-medium px-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-2 rounded-md px-2 py-1"
                  placeholder="Category"
                />
              </div>
    
                  {/*check if imagePreview have value then show div otherwise hide div  */}
              {blogImagePreview && (
                <div className="w-36 h-40 rounded-md overflow-hidden profileImage mx-auto my-2">
                  <img
                    src={blogImagePreview ? blogImagePreview : blogImage}
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
                  // value={blogImage}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="5"
                  className="w-full border-2 rounded-md px-2 py-1 focus:border-blue-400 focus:ring-blue-400"
                  id="desctiption"
                  placeholder="Write about blog in detail"
                ></textarea>
              </div>
              <button type="submit" className="relative  bg-blue-500 text-white px-6 py-2 rounded-md">
                Update
              </button>
            </form>
          </div>
        </div>
      );
}

export default UpdateBlog;