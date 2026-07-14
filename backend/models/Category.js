import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    // =====================================
    // Category Name
    // =====================================

    categoryName: {
      type: String,
      required: [true, "Category Name is required"],
      trim: true,
      uppercase: true,
      maxlength: 100,
    },

    // =====================================
    // Status
    // 1 = Active
    // 0 = Inactive
    // =====================================

    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },

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
  },
);

// =====================================
// Prevent Duplicate Categories
// Company Wise
// =====================================

categorySchema.index(
  {
    categoryName: 1,
    companyId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
