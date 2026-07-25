
import express from "express";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";

const router = express.Router();

// =====================================================
// @desc    Get All Customers
// @route   GET /api/customer
// @access  Private
// =====================================================

router.get(
  "/",
  protect,
  getCustomers
);

// =====================================================
// @desc    Get Customer By ID
// @route   GET /api/customer/:id
// @access  Private
// =====================================================

router.get(
  "/:id",
  protect,
  getCustomerById
);

// =====================================================
// @desc    Create Customer
// @route   POST /api/customer
// @access  Private (Admin)
// =====================================================

router.post(
  "/",
  protect,
  authorize("Admin"),
  createCustomer
);

// =====================================================
// @desc    Update Customer
// @route   PUT /api/customer/:id
// @access  Private (Admin)
// =====================================================

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  updateCustomer
);

// =====================================================
// @desc    Delete Customer (Soft Delete)
// @route   DELETE /api/customer/:id
// @access  Private (Admin)
// =====================================================

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCustomer
);

export default router;