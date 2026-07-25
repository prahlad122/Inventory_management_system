import express from "express";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();

// Get All Items
router.get("/", protect, getItems);

// Get Item By ID
router.get("/:id", protect, getItemById);

// Create Item
router.post(
  "/",
  protect,
  authorize("Admin"),
  createItem
);

// Update Item
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateItem
);

// Delete Item
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteItem
);

export default router;