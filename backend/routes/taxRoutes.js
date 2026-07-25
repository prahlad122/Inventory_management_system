import express from "express";

import {
  createTax,
  getTaxes,
  getTaxById,
  updateTax,
  deleteTax,
} from "../controllers/taxController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();

router.get("/", protect, getTaxes);

router.get("/:id", protect, getTaxById);

router.post("/", protect, authorize("Admin"), createTax);

router.put("/:id", protect, authorize("Admin"), updateTax);

router.delete("/:id", protect, authorize("Admin"), deleteTax);

export default router;