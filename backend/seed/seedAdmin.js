import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // =============================
    // Create Admin (Only Once)
    // =============================

    const admin = await User.findOne({ username: "admin" });

    if (!admin) {
      const newAdmin = new User({
        username: "admin",
        password: "admin123", // pre("save") will hash it
        role: "Admin",
        status: 1,
        companyId: 1,
        entryUserId: null,
        entryDate: new Date(),
        modifyUserId: null,
        modifyDate: null,
      });

      await newAdmin.save();

      console.log("✅ Admin created");
    } else {
      console.log("✅ Admin already exists");
    }

    // =============================
    // Create User (Only Once)
    // =============================

    const user = await User.findOne({ username: "prahlad" });

    if (!user) {
      const newUser = new User({
        username: "prahlad",
        email: "prahlad@gmail.com",
        mobile: "9532000064", // 10 digits
        password: "prahlad123", // pre("save") will hash it
        role: "User",
        status: 1,
        companyId: 1,
        entryUserId: null,
        entryDate: new Date(),
        modifyUserId: null,
        modifyDate: null,
      });

      await newUser.save();

      console.log("✅ User created");
    } else {
      console.log("✅ User already exists");
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();