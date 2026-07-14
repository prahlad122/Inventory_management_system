import express from "express";

import { loginUser, getProfile } from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";
 

const router = express.Router();

// =====================================
// Public Routes
// =====================================

// Login
router.post("/login", loginUser);

// =====================================
// Protected Routes
// =====================================

 

// Logged-in User Profile

router.get("/me", protect, getProfile);

export default router;
