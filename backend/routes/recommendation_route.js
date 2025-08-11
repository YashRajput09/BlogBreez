import express from "express";
import {getRelatedBlogs} from "../controller/recommandetion_controller.js";

const router = express.Router();

// Get Recommended Blogs
router.route("/:id").get(getRelatedBlogs)

export default router;