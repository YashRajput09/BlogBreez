import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, getMyBlogs, updateBlog, searchBlogs } from "../controller/blog_controller.js"
import { isAuthenticated } from "../middleware/authenticateUser.js";
import { isAdmin } from "../middleware/authorizeUser.js";
const router = express.Router();

router.
    route("/create")
    .post(isAuthenticated, isAdmin("admin"),  createBlog); // isAdmin("admin"), the parameter "admin" defines only admin are allowed

router.
    route("/delete/:id")
    .delete(isAuthenticated, isAdmin("admin"), deleteBlog);

router.
    route("/all-blogs")
    // .get(isAuthenticated, getAllBlogs);
    .get(getAllBlogs);

router.
    route("/single-blog/:id")
    .get(isAuthenticated, getSingleBlog);

router.
    route("/myblogs")
    .get(isAuthenticated, isAdmin("admin"), getMyBlogs);

router.
    route("/update/:id")
    .put(isAuthenticated, isAdmin("admin"), updateBlog);

router.
    route("/api/search")
    .get( searchBlogs);
export default router;