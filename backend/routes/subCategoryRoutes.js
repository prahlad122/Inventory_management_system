import express from "express";

import {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();

// ======================================================
// Get All Sub Categories
// GET /api/subcategory
// ======================================================

router.get(
  "/",
  protect,
  getSubCategories
);

// ======================================================
// Get Single Sub Category
// GET /api/subcategory/:id
// ======================================================

router.get(
  "/:id",
  protect,
  getSubCategoryById
);

// ======================================================
// Create Sub Category
// POST /api/subcategory
// ======================================================

router.post(
  "/",
  protect,
  authorize("Admin"),
  createSubCategory
);

// ======================================================
// Update Sub Category
// PUT /api/subcategory/:id
// ======================================================

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateSubCategory
);

// ======================================================
// Delete Sub Category (Soft Delete)
// DELETE /api/subcategory/:id
// ======================================================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteSubCategory
);

export default router;