import express from "express";
import {recommendedBlogs} from "../controller/recommandetion_controller.js";

const router = express.Router();

// Get Recommended Blogs
router.route("/:id").get(recommendedBlogs)

export default router;