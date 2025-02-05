import express from "express";

import {recommendedBlogs} from "../controller/recommandetion_controller";

const router = express.Router();

// Get Recommended Blogs
router.route("/recommend/:id").get(recommendedBlogs)