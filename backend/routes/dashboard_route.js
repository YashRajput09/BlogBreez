import express from "express";
import { isAuthenticated } from "../middleware/authenticateUser.js";
import { getAnalysisData, getTopPerformaceArticle, getRecentActivities } from "../controller/blog_analysis.js";

const router = express.Router();

router
  .route("/analytics")
  .get(isAuthenticated,  getAnalysisData);

router
  .route("/analytics/topperformingblogs")
  .get(isAuthenticated, getTopPerformaceArticle);

router
  .route("/analytics/recent-activities")
  .get(isAuthenticated, getRecentActivities);
export default router;
