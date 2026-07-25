import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    // =====================================
    // Tax Name
    // Example: GST 18%
    // =====================================

    taxName: {
      type: String,
      required: [true, "Tax Name is required"],
      trim: true,
      uppercase: true,
      maxlength: 100,
    },

    // =====================================
    // Tax Type
    // =====================================

    taxType: {
      type: String,
      enum: ["GST", "EXEMPT"],
      required: [true, "Tax Type is required"],
    },

    // =====================================
    // Tax Percentage
    // =====================================

    percentage: {
      type: Number,
      required: [true, "Tax Percentage is required"],
      min: 0,
      max: 100,
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
// Prevent Duplicate Taxes
// Company Wise
// =====================================

taxSchema.index(
  {
    taxName: 1,
    companyId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

const Tax = mongoose.model("Tax", taxSchema);

export default Tax;