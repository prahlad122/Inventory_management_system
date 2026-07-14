import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Token Not Found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Token Missing.",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get User Without Password

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found.",
      });
    }

    // Check Active Status
    
    if (user.status === 0) {
      return res.status(403).json({
        success: false,
        message: "User Account is Inactive.",
      });
    }

    // Store Logged-in User
    
    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};

export default protect;