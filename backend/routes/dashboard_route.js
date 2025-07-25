import express from "express";
import { isAuthenticated } from "../middleware/authenticateUser.js";
import {getTopPerformaceArticle} from "../controller/blog_analysis.js";

const router = express.Router();

router
  .route("/analytics/topperformingblogs")
  .get(isAuthenticated, getTopPerformaceArticle);

  export default router;
