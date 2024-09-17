import express from "express";
import { createBlog } from "../controller/blog_controller.js"
const router = express.Router();

router.
    route("/create")
    .post(createBlog);

export default router;