import express from "express";
import { signUpUser, logInUser, logOutUser } from "../controller/user_controller.js";
import {isAuthenticated} from  "../middleware/authenticateUser.js"
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
    .post(isAuthenticated, logOutUser)
export default router;
