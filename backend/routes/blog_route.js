import express from "express";
import { createBlog } from "../controller/blog_controller.js"
import { isAuthenticated } from "../middleware/authenticateUser.js";
import { isAdmin } from "../middleware/authorizeUser.js";
const router = express.Router();

router.
    route("/create")
    .post(isAuthenticated, isAdmin("admin"),  createBlog);

export default router;