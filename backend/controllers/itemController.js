import Item from "../models/Item.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Tax from "../models/Tax.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// =====================================================
// @desc    Create Item
// @route   POST /api/item
// @access  Private (Admin)
// =====================================================

export const createItem = asyncHandler(async (req, res) => {

  const {
    itemName,
    itemCode,
    barcode,
    categoryId,
    subCategoryId,
    taxId,
    purchasePrice,
    sellingPrice,
    mrp,
    openingStock,
    minimumStock,
    status,
  } = req.body;

  // =====================================
  // Required Field Validation
  // =====================================

  if (!itemName)
    throw new ApiError(400, "Item Name is required.");

  if (!itemCode)
    throw new ApiError(400, "Item Code is required.");

  if (!categoryId)
    throw new ApiError(400, "Category is required.");

  if (!subCategoryId)
    throw new ApiError(400, "Sub Category is required.");

  if (!taxId)
    throw new ApiError(400, "Tax is required.");

  if (purchasePrice === undefined || purchasePrice === "")
    throw new ApiError(400, "Purchase Price is required.");

  if (sellingPrice === undefined || sellingPrice === "")
    throw new ApiError(400, "Selling Price is required.");

  if (mrp === undefined || mrp === "")
    throw new ApiError(400, "MRP is required.");

  if (openingStock === undefined || openingStock === "")
    throw new ApiError(400, "Opening Stock is required.");

  // =====================================
  // Business Validations
  // =====================================

  if (Number(sellingPrice) < Number(purchasePrice)) {
    throw new ApiError(
      400,
      "Selling Price cannot be less than Purchase Price."
    );
  }

  if (Number(mrp) < Number(sellingPrice)) {
    throw new ApiError(
      400,
      "MRP cannot be less than Selling Price."
    );
  }

  if (Number(openingStock) < 0) {
    throw new ApiError(
      400,
      "Opening Stock cannot be negative."
    );
  }

  if (Number(minimumStock) < 0) {
    throw new ApiError(
      400,
      "Minimum Stock cannot be negative."
    );
  }

  // =====================================
  // Duplicate Item Code
  // =====================================

  const existingItem = await Item.findOne({
    itemCode: itemCode.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingItem) {
    throw new ApiError(
      400,
      "Item Code already exists."
    );
  }

  // =====================================
  // Validate Category
  // =====================================

  const category = await Category.findOne({
    _id: categoryId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    throw new ApiError(
      404,
      "Selected Category not found."
    );
  }

  // =====================================
  // Validate Sub Category
  // =====================================

  const subCategory = await SubCategory.findOne({
    _id: subCategoryId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!subCategory) {
    throw new ApiError(
      404,
      "Selected Sub Category not found."
    );
  }

  // =====================================
  // Verify SubCategory belongs to Category
  // =====================================

  if (
    subCategory.categoryId.toString() !==
    categoryId.toString()
  ) {
    throw new ApiError(
      400,
      "Selected Sub Category does not belong to selected Category."
    );
  }

  // =====================================
  // Validate Tax
  // =====================================

  const tax = await Tax.findOne({
    _id: taxId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!tax) {
    throw new ApiError(
      404,
      "Selected Tax not found."
    );
  }

  // =====================================
  // Create Item
  // =====================================

  const item = await Item.create({

    itemName: itemName.trim().toUpperCase(),

    itemCode: itemCode.trim().toUpperCase(),

    barcode,

    categoryId,

    subCategoryId,

    taxId,

    purchasePrice,

    sellingPrice,

    mrp,

    openingStock,

    currentStock: openingStock,

    minimumStock,

    status,

    companyId: req.user.companyId,

    entryUserId: req.user._id,

    entryDate: new Date(),

  });

  res.status(201).json({

    success: true,

    message: "Item created successfully.",

    data: item,

  });

});

// =====================================================
// @desc    Get All Items
// @route   GET /api/item
// @access  Private
// =====================================================

export const getItems = asyncHandler(async (req, res) => {

  const items = await Item.find({
    companyId: req.user.companyId,
    isDeleted: false,
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("taxId", "taxName taxType percentage")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: items.length,
    data: items,
  });

});


// =====================================================
// @desc    Get Item By ID
// @route   GET /api/item/:id
// @access  Private
// =====================================================

export const getItemById = asyncHandler(async (req, res) => {

  const item = await Item.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  })
    .populate("categoryId", "categoryName")
    .populate("subCategoryId", "subCategoryName")
    .populate("taxId", "taxName taxType percentage");

  if (!item) {
    throw new ApiError(404, "Item not found.");
  }

  res.status(200).json({
    success: true,
    data: item,
  });

});

// =====================================================
// @desc    Update Item
// @route   PUT /api/item/:id
// @access  Private (Admin)
// =====================================================

export const updateItem = asyncHandler(async (req, res) => {

  const {
    itemName,
    itemCode,
    barcode,
    categoryId,
    subCategoryId,
    taxId,
    purchasePrice,
    sellingPrice,
    mrp,
    openingStock,
    minimumStock,
    status,
  } = req.body;

  // =====================================
  // Required Field Validation
  // =====================================

  if (!itemName)
    throw new ApiError(400, "Item Name is required.");

  if (!itemCode)
    throw new ApiError(400, "Item Code is required.");

  if (!categoryId)
    throw new ApiError(400, "Category is required.");

  if (!subCategoryId)
    throw new ApiError(400, "Sub Category is required.");

  if (!taxId)
    throw new ApiError(400, "Tax is required.");

  if (purchasePrice === undefined || purchasePrice === "")
    throw new ApiError(400, "Purchase Price is required.");

  if (sellingPrice === undefined || sellingPrice === "")
    throw new ApiError(400, "Selling Price is required.");

  if (mrp === undefined || mrp === "")
    throw new ApiError(400, "MRP is required.");

  // =====================================
  // Find Existing Item
  // =====================================

  const item = await Item.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!item) {
    throw new ApiError(404, "Item not found.");
  }

  // =====================================
  // Business Validation
  // =====================================

  if (Number(sellingPrice) < Number(purchasePrice)) {
    throw new ApiError(
      400,
      "Selling Price cannot be less than Purchase Price."
    );
  }

  if (Number(mrp) < Number(sellingPrice)) {
    throw new ApiError(
      400,
      "MRP cannot be less than Selling Price."
    );
  }

  if (Number(openingStock) < 0) {
    throw new ApiError(
      400,
      "Opening Stock cannot be negative."
    );
  }

  if (Number(minimumStock) < 0) {
    throw new ApiError(
      400,
      "Minimum Stock cannot be negative."
    );
  }

  // =====================================
  // Duplicate Item Code Check
  // =====================================

  const duplicate = await Item.findOne({
    itemCode: itemCode.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
    _id: { $ne: req.params.id },
  });

  if (duplicate) {
    throw new ApiError(
      400,
      "Item Code already exists."
    );
  }

  // =====================================
  // Validate Category
  // =====================================

  const category = await Category.findOne({
    _id: categoryId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    throw new ApiError(
      404,
      "Selected Category not found."
    );
  }

  // =====================================
  // Validate SubCategory
  // =====================================

  const subCategory = await SubCategory.findOne({
    _id: subCategoryId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!subCategory) {
    throw new ApiError(
      404,
      "Selected Sub Category not found."
    );
  }

  // =====================================
  // Verify Relationship
  // =====================================

  if (
    subCategory.categoryId.toString() !==
    categoryId.toString()
  ) {
    throw new ApiError(
      400,
      "Selected Sub Category does not belong to selected Category."
    );
  }

  // =====================================
  // Validate Tax
  // =====================================

  const tax = await Tax.findOne({
    _id: taxId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!tax) {
    throw new ApiError(
      404,
      "Selected Tax not found."
    );
  }

  // =====================================
  // Update Item
  // =====================================

  item.itemName = itemName.trim().toUpperCase();
  item.itemCode = itemCode.trim().toUpperCase();
  item.barcode = barcode;

  item.categoryId = categoryId;
  item.subCategoryId = subCategoryId;
  item.taxId = taxId;

  item.purchasePrice = purchasePrice;
  item.sellingPrice = sellingPrice;
  item.mrp = mrp;

  // Allow updating opening stock only if current stock
  // has not yet changed through transactions.
  if (item.currentStock === item.openingStock) {
    item.openingStock = openingStock;
    item.currentStock = openingStock;
  }

  item.minimumStock = minimumStock;
  item.status = status;

  item.modifyUserId = req.user._id;
  item.modifyDate = new Date();

  await item.save();

  res.status(200).json({
    success: true,
    message: "Item updated successfully.",
    data: item,
  });

});

// =====================================================
// @desc    Delete Item (Soft Delete)
// @route   DELETE /api/item/:id
// @access  Private (Admin)
// =====================================================

export const deleteItem = asyncHandler(async (req, res) => {

  // =====================================
  // Find Item
  // =====================================

  const item = await Item.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!item) {
    throw new ApiError(404, "Item not found.");
  }

  // =====================================
  // Soft Delete
  // =====================================

  item.isDeleted = true;

  item.modifyUserId = req.user._id;

  item.modifyDate = new Date();

  await item.save();

  // =====================================
  // Response
  // =====================================

  res.status(200).json({
    success: true,
    message: "Item deleted successfully.",
  });

});