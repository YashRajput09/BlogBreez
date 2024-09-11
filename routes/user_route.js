import express from "express";
import { signUpUser } from "../controller/user_controller.js";
const router = express.Router();

router.
    route("/signup")
    // .get(signUpFrom)
    .post(signUpUser);

export default router;
