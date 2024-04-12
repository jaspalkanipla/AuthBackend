import express from "express";
import { signUp} from "../controller/signup.js";
import { signIn} from "../controller/signin.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { userDashboard } from "../controller/userDashboard.js";
import { signOut } from "../controller/signout.js";
import { home } from "../controller/home.js";
const router = express.Router();
router.get('/',home)
router.post("/signup",signUp );
router.post("/signin",signIn );
router.get("/userDashboard",verifyToken, userDashboard );
router.post("/signout",verifyToken, signOut );
export default router;
