
import { Router } from "express";
import { createCategory, getCategory, updateCategory,deleteCategory } from "../controllers/category.controller.js";



const router = Router();


router.post('/create-category',createCategory)
router.get('/get-category',getCategory)
router.put('/update-category/:id',updateCategory)
router.delete('/delete-category/:id',deleteCategory)

export default router

