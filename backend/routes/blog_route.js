import express from "express";
import { createBlog } from "../controller/blog_controller.js"
import { isAuthenticated } from "../middleware/authenticateUser.js";
const router = express.Router();

router.
    route("/create")
    .post(isAuthenticated, createBlog);

export default router;