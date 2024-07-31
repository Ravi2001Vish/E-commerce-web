import express from 'express'
// import auth from '../middlewares/auth.middlewares'

import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from '../controllers/category.controller';
const router = express.Router();

router.get("/get-categories" , getCategories)
router.get("/get-category/:category_id" , getCategory)
router.post("/add-Category",     addCategory)
router.put("/update-category/:category_id" , updateCategory)
router.delete("/delete-category/:category_id" , deleteCategory)




export default router