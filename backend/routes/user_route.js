import express from "express";
import { signUpUser, logInUser } from "../controller/user_controller.js";
const router = express.Router();

router.
    route("/signup")
    // .get(signUpFrom)
    .post(signUpUser);

router.
    route("/login")
    // .get(logInForm)
    .post(logInUser);

export default router;
