import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    // =====================================
    // Customer Information
    // =====================================

    customerName: {
      type: String,
      required: [true, "Customer Name is required"],
      trim: true,
      uppercase: true,
      maxlength: 150,
    },

    customerCode: {
      type: String,
      required: [true, "Customer Code is required"],
      trim: true,
      uppercase: true,
      maxlength: 30,
    },

    // =====================================
    // Contact Information
    // =====================================

    mobile: {
      type: String,
      required: [true, "Mobile Number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"],
    },

    alternateMobile: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    // =====================================
    // GST Details
    // =====================================

    gstin: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },

    // =====================================
    // Address
    // =====================================

    address: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
      uppercase: true,
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      uppercase: true,
    },

    country: {
      type: String,
      default: "INDIA",
      uppercase: true,
      trim: true,
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
      match: [/^\d{6}$/, "Please enter a valid pincode"],
    },

    // =====================================
    // Financial Information
    // =====================================

    creditLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    openingBalance: {
      type: Number,
      default: 0,
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
// Unique Customer Code (Company Wise)
// =====================================

customerSchema.index(
  {
    customerCode: 1,
    companyId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

// =====================================
// Unique Mobile (Company Wise)
// =====================================

customerSchema.index(
  {
    mobile: 1,
    companyId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;