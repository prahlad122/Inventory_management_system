import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

// =====================================================
// @desc    Create Category
// @route   POST /api/category
// @access  Private (Admin)
// =====================================================
export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, status } = req.body;

  if (!categoryName) {
    res.status(400);
    throw new Error("Category Name is required.");
  }

  const existingCategory = await Category.findOne({
    categoryName: categoryName.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists.");
  }

  const category = await Category.create({
    categoryName: categoryName.trim().toUpperCase(),
    status,
    companyId: req.user.companyId,
    entryUserId: req.user._id,
    entryDate: new Date(),
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully.",
    data: category,
  });
});
// =====================================================
// @desc    Get All Categories
// @route   GET /api/category
// @access  Private
// =====================================================

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({
    companyId: req.user.companyId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

// =====================================================
// @desc    Get Single Category
// @route   GET /api/category/:id
// @access  Private
// =====================================================

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

// =====================================================
// @desc    Update Category
// @route   PUT /api/category/:id
// @access  Private (Admin)
// =====================================================

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryName, status } = req.body;

  if (!categoryName) {
    res.status(400);
    throw new Error("Category Name is required.");
  }

  const category = await Category.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  const duplicate = await Category.findOne({
    categoryName: categoryName.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
    _id: { $ne: req.params.id },
  });

  if (duplicate) {
    res.status(400);
    throw new Error("Category already exists.");
  }

  category.categoryName = categoryName.trim().toUpperCase();
  category.status = status;
  category.modifyUserId = req.user._id;
  category.modifyDate = new Date();

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully.",
    data: category,
  });
});
// =====================================================
// @desc    Delete Category
// @route   DELETE /api/category/:id
// @access  Private (Admin)
// =====================================================

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOne({
    _id: req.params.id,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  category.isDeleted = true;
  category.modifyUserId = req.user._id;
  category.modifyDate = new Date();

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
  });
});
