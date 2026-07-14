import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// =========================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// =========================================

export const loginUser = async (req, res) => {
  try {
   const { login, password } = req.body;

    // ==============================
    // Validation
    // ==============================

    if (!login || !password) {
  return res.status(400).json({
    success: false,
    message: "Username, Email or Mobile and Password are required.",
  });
}

    // ==============================
    // Find User
    // ==============================

    const user = await User.findOne({
  $or: [
    { username: login },
    { email: login },
    { mobile: login }
  ]
});

    if (!user) {
  return res.status(401).json({
    message: "Invalid credentials"
  });
}

    // ==============================
    // Check Status
    // ==============================

    if (user.status === 0) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive. Contact administrator.",
      });
    }

    // ==============================
    // Compare Password
    // ==============================

    const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(401).json({
    message: "Invalid credentials"
  });
}

    // ==============================
    // Generate Token
    // ==============================

    const token = generateToken(user);

    // ==============================
    // Success Response
    // ==============================

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        companyId: user.companyId,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login Error :", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================================
// @desc    Get Logged-in User
// @route   GET /api/auth/me
// @access  Private
// =========================================

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      user: {
        id: req.user._id,

        username: req.user.username,

        role: req.user.role,

        companyId: req.user.companyId,

        status: req.user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
