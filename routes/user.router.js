import { Router } from "express";
import { Login, signup, UserProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", Login);
router.get("/profile", isAuthenticated, UserProfile);

export default router;
