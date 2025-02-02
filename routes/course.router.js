import express, { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCreatorCourse,
  updateCourse,
} from "../controllers/courses.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

import upload from "../middleware/multer.js";

const router = Router();

router.post("/create-courses", isAuthenticated,upload.single("courseThumbnail"), createCourse);
router.get("/get-courses", isAuthenticated, getCreatorCourse);
router.delete("/delete/:id", isAuthenticated, deleteCourse);
router.put("/update-course/:id", isAuthenticated,upload.single("courseThumbnail"), updateCourse);

export default router;
