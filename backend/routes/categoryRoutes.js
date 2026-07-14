import express from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();

router.get("/", protect, getCategories);

router.get("/:id", protect, getCategoryById);

router.post(
  "/",
  protect,
  authorize("Admin"),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCategory
);

export default router;