// routes/qaRoutes.js
import express from "express";
import { qaAssistant } from "../controller/qaAssistant_controller.js";

const router = express.Router();

router.post("/:blogId/ask", qaAssistant);

export default router;
