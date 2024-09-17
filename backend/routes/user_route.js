import express from "express";
import { signUpUser, logInUser, logOutUser } from "../controller/user_controller.js";
const router = express.Router();

router.
    route("/signup")
    // .get(signUpFrom)
    .post(signUpUser);

router.
    route("/login")
    // .get(logInForm)
    .post(logInUser);

router.
    route("/logout")
    .post(logOutUser)
export default router;
