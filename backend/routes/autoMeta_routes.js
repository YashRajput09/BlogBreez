import express from "express";
import { generateAutoMeta } from "../controller/autoMeta_controller.js";

const router = express.Router();

router.post("/", generateAutoMeta);

export default router;
