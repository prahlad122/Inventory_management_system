import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";


const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));



// ==============================================
// API Routes
// ==============================================

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);


app.use(errorHandler);

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Inventory Billing Backend Running..."
  });

});

export default app;