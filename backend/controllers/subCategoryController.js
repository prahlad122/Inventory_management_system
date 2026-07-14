import SubCategory from "../models/SubCategory.js";
import Category from "../models/Category.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// =====================================================
// @desc    Create Sub Category
// @route   POST /api/subcategory
// @access  Private (Admin)
// =====================================================

export const createSubCategory = asyncHandler(async (req, res) => {

  const { categoryId, subCategoryName, status } = req.body;

  // Validation

  if (!categoryId) {
    throw new ApiError(400, "Category is required.");
  }

  if (!subCategoryName) {
    throw new ApiError(400, "Sub Category Name is required.");
  }

  // Check Category Exists

  const category = await Category.findOne({
    _id: categoryId,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  // Duplicate Check

  const existingSubCategory = await SubCategory.findOne({
    categoryId,
    subCategoryName: subCategoryName.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingSubCategory) {
    throw new ApiError(400, "Sub Category already exists.");
  }

  const subCategory = await SubCategory.create({

    categoryId,

    subCategoryName: subCategoryName.trim().toUpperCase(),

    status,

    companyId: req.user.companyId,

    entryUserId: req.user._id,

    entryDate: new Date(),

  });

  res.status(201).json({

    success: true,

    message: "Sub Category created successfully.",

    data: subCategory,

  });

});

// =====================================================
// @desc    Get All Sub Categories
// @route   GET /api/subcategory
// @access  Private
// =====================================================

export const getSubCategories = asyncHandler(async (req, res) => {

  const subCategories = await SubCategory.find({

    companyId: req.user.companyId,

    isDeleted: false,

  })

    .populate("categoryId", "categoryName")

    .sort({ createdAt: -1 });

  res.status(200).json({

    success: true,

    count: subCategories.length,

    data: subCategories,

  });

});

// =====================================================
// @desc    Get Single Sub Category
// @route   GET /api/subcategory/:id
// @access  Private
// =====================================================

export const getSubCategoryById = asyncHandler(async (req, res) => {

  const subCategory = await SubCategory.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  }).populate("categoryId", "categoryName");

  if (!subCategory) {
    throw new ApiError(404, "Sub Category not found.");
  }

  res.status(200).json({

    success: true,

    data: subCategory,

  });

});

// =====================================================
// @desc    Update Sub Category
// @route   PUT /api/subcategory/:id
// @access  Private (Admin)
// =====================================================

export const updateSubCategory = asyncHandler(async (req, res) => {

  const { categoryId, subCategoryName, status } = req.body;

  if (!categoryId) {
    throw new ApiError(400, "Category is required.");
  }

  if (!subCategoryName) {
    throw new ApiError(400, "Sub Category Name is required.");
  }

  const subCategory = await SubCategory.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!subCategory) {
    throw new ApiError(404, "Sub Category not found.");
  }

  const duplicate = await SubCategory.findOne({

    categoryId,

    subCategoryName: subCategoryName.trim().toUpperCase(),

    companyId: req.user.companyId,

    isDeleted: false,

    _id: { $ne: req.params.id },

  });

  if (duplicate) {
    throw new ApiError(400, "Sub Category already exists.");
  }

  subCategory.categoryId = categoryId;

  subCategory.subCategoryName =
    subCategoryName.trim().toUpperCase();

  subCategory.status = status;

  subCategory.modifyUserId = req.user._id;

  subCategory.modifyDate = new Date();

  await subCategory.save();

  res.status(200).json({

    success: true,

    message: "Sub Category updated successfully.",

    data: subCategory,

  });

});

// =====================================================
// @desc    Delete Sub Category
// @route   DELETE /api/subcategory/:id
// @access  Private (Admin)
// =====================================================

export const deleteSubCategory = asyncHandler(async (req, res) => {

  const subCategory = await SubCategory.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!subCategory) {
    throw new ApiError(404, "Sub Category not found.");
  }

  subCategory.isDeleted = true;

  subCategory.modifyUserId = req.user._id;

  subCategory.modifyDate = new Date();

  await subCategory.save();

  res.status(200).json({

    success: true,

    message: "Sub Category deleted successfully.",

  });

});