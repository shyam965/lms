import { Router } from "express";
import { chapterCreate, chapterGet } from "../controllers/chapter.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";

const router=Router()
router.post("/create-chapter",isAuthenticated,upload.single("chapter_url"),chapterCreate)
router.get("/get-chapter/:id",isAuthenticated,chapterGet)



export default router;