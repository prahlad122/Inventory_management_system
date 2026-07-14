import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    // =====================================
    // Category Reference
    // =====================================

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    // =====================================
    // Sub Category Name
    // =====================================

    subCategoryName: {
      type: String,
      required: [true, "Sub Category Name is required"],
      trim: true,
      uppercase: true,
      maxlength: 100,
    },

    // =====================================
    // Status
    // =====================================

    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },

    // =====================================
    // Soft Delete
    // =====================================

    isDeleted: {
      type: Boolean,
      default: false,
    },

    // =====================================
    // Company
    // =====================================

    companyId: {
      type: Number,
      required: true,
    },

    // =====================================
    // Audit Fields
    // =====================================

    entryUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    entryDate: {
      type: Date,
      default: Date.now,
    },

    modifyUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    modifyDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================
// Prevent Duplicate SubCategories
// Inside Same Category & Company
// =====================================

subCategorySchema.index(
  {
    categoryId: 1,
    subCategoryName: 1,
    companyId: 1,
  },
  {
    unique: true,
  }
);

const SubCategory = mongoose.model(
  "SubCategory",
  subCategorySchema
);

export default SubCategory;