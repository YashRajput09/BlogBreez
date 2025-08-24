import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import EmptyBlog from './EmptyBlog';
import SkeletonLoader from '../loaders/SkeletonLoader';

const MyBlogs = ({ setComponent }) => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // for modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/blog/myblogs`,
          {
            withCredentials: true,
          }
        );
        setMyBlogs(data);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  if (loader) {
    return <SkeletonLoader />;
  }

  const handleDelete = async (id) => {
    // Optimistic UI update
    const deletedBlog = myBlogs.find((b) => b._id === id);
    setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));

    let undo = false;

    // Show toast with Undo option
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Blog deleted</span>
          <button
            onClick={() => {
              undo = true;
              setMyBlogs((prev) => [deletedBlog, ...prev]); // restore blog
              toast.dismiss(t.id);
              toast.success('Delete undone');
            }}
            className="text-blue-500 font-semibold"
          >
            Undo
          </button>
        </div>
      ),
      {
        duration: 5000, // give 5 seconds to undo
      }
    );

    // Wait 5s before final delete
    setTimeout(async () => {
      if (!undo) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_APP_BACKEND_URL}/blog/delete/${id}`,
            { withCredentials: true }
          );
          toast.success('Blog permanently deleted');
          navigate('/dashboard');
        } catch (error) {
          console.log(error);
          toast.error('Failed to delete blog');
          // restore if API fails
          setMyBlogs((prev) => [deletedBlog, ...prev]);
        }
      }
    }, 5000);
  };

  return (
    <>
      <div className="md:mx-10 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-5 gap-4 p-5 my-8 md:my-5 md:ml-60">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map(({ _id, blogImage, title, category }) => (
            <div
              key={_id}
              className="shadow-xl rounded-lg overflow-hidden transform hover:scale-105 duration-300 transition-transform"
            >
              {/* Image & Title link */}
              <Link to={`/blog/view/${_id}`} className="group relative block">
                <img
                  src={blogImage.url}
                  className="w-full h-56 object-cover"
                  alt="Blog"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-25 group-hover:opacity-75 transition-transform duration-300"></div>
                <h1 className="absolute bottom-4 text-white tracking-tight left-4 md:text-xl font-semibold group-hover:text-gray-300 duration-300 group-hover:tracking-wider">
                  {title}
                </h1>
              </Link>

              {/* Details & Actions */}
              <div className="space-y-2 p-4">
                <p className="text-xs text-gray-400">{category}</p>
                <div className="flex justify-between text-xs text-white">
                  <Link
                    to={`/blog/update/${_id}`}
                    className="border-2 rounded-md px-3 py-1 bg-blue-400 hover:bg-blue-600 duration-300 ease-in-out"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => setDeleteId(_id)} // open modal
                    className="border-2 rounded-md px-3 py-1 bg-red-400 hover:bg-red-600 duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute top-0 right-0 min-w-full z-0">
            <p className="text-center text-gray-500 ">
              <EmptyBlog setComponent={setComponent} />
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600 mt-2">
              Do you really want to delete this blog?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBlogs;
