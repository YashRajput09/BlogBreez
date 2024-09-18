import express from "express";
import { createBlog, deleteBlog } from "../controller/blog_controller.js"
import { isAuthenticated } from "../middleware/authenticateUser.js";
import { isAdmin } from "../middleware/authorizeUser.js";
const router = express.Router();

router.
    route("/create")
    .post(isAuthenticated, isAdmin("admin"),  createBlog); // isAdmin("admin"), the parameter "admin" defines only admin are allowed

router.
    route("/delete/:id")
    .delete(isAuthenticated, isAdmin("admin"), deleteBlog);
export default router;