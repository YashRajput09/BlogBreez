import express from "express";
import {
  signUpUser,
  logInUser,
  logOutUser,
  getMyProfile,
  getAdmins,
} from "../controller/user_controller.js";
import { isAuthenticated } from "../middleware/authenticateUser.js";
import { isAdmin } from "../middleware/authorizeUser.js";
import { saveRedirectUrl } from "../middleware/redirectUrl.js";
const router = express.Router();

router
  .route("/signup")
  // .get(signUpFrom)
  .post(signUpUser);

router
  .route("/login")
  // .get(logInForm)
  .post(saveRedirectUrl, logInUser);

router.route("/logout").post(isAuthenticated, logOutUser);

router.route("/myprofile").get(isAuthenticated, getMyProfile);

router.route("/admins").get(isAuthenticated, isAdmin("admin"), getAdmins);
export default router;
