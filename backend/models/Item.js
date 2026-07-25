import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    // =====================================
    // Item Information
    // =====================================

    itemName: {
      type: String,
      required: [true, "Item Name is required"],
      trim: true,
      uppercase: true,
      maxlength: 150,
    },

    itemCode: {
      type: String,
      required: [true, "Item Code is required"],
      trim: true,
      uppercase: true,
      maxlength: 50,
    },

    barcode: {
      type: String,
      trim: true,
      default: "",
    },

    // =====================================
    // Category
    // =====================================

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    // =====================================
    // Sub Category
    // =====================================

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "Sub Category is required"],
    },

    // =====================================
    // Tax
    // =====================================

    taxId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tax",
      required: [true, "Tax is required"],
    },

    // =====================================
    // Pricing
    // =====================================

    purchasePrice: {
      type: Number,
      required: [true, "Purchase Price is required"],
      min: 0,
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling Price is required"],
      min: 0,
    },

    mrp: {
      type: Number,
      required: [true, "MRP is required"],
      min: 0,
    },

    // =====================================
    // Stock
    // =====================================

    openingStock: {
      type: Number,
      required: [true, "Opening Stock is required"],
      min: 0,
      default: 0,
    },

    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 0,
      min: 0,
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
// Unique Index
// =====================================

itemSchema.index(
  {
    itemCode: 1,
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
// Set Current Stock Automatically
// =====================================

itemSchema.pre("save", function (next) {
  if (this.isNew) {
    this.currentStock = this.openingStock;
  }
   
});

const Item = mongoose.model("Item", itemSchema);

export default Item;