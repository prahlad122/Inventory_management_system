import Tax from "../models/Tax.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

 
// @desc    Create Tax
// @route   POST /api/tax
// @access  Private (Admin)
 

export const createTax = asyncHandler(async (req, res) => {

  const { taxName, taxType, percentage, status } = req.body;

  
  // Validation
 

  if (!taxName) {
    throw new ApiError(400, "Tax Name is required.");
  }

  if (!taxType) {
    throw new ApiError(400, "Tax Type is required.");
  }

  if (percentage === undefined || percentage === null || percentage === "") {
    throw new ApiError(400, "Tax Percentage is required.");
  }

  
  // Duplicate Check
  

  const existingTax = await Tax.findOne({
    taxName: taxName.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingTax) {
    throw new ApiError(400, "Tax already exists.");
  }

   
  // Create Tax
  

  const tax = await Tax.create({

    taxName: taxName.trim().toUpperCase(),

    taxType,

    percentage,

    status,

    companyId: req.user.companyId,

    entryUserId: req.user._id,

    entryDate: new Date(),

  });

  res.status(201).json({

    success: true,

    message: "Tax created successfully.",

    data: tax,

  });

});


 
// @desc    Get All Taxes
// @route   GET /api/tax
// @access  Private
 

export const getTaxes = asyncHandler(async (req, res) => {

  const taxes = await Tax.find({

    companyId: req.user.companyId,

    isDeleted: false,

  }).sort({ createdAt: -1 });

  res.status(200).json({

    success: true,

    count: taxes.length,

    data: taxes,

  });

});


 
// @desc    Get Tax By Id
// @route   GET /api/tax/:id
// @access  Private
 

export const getTaxById = asyncHandler(async (req, res) => {

  const tax = await Tax.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!tax) {

    throw new ApiError(404, "Tax not found.");

  }

  res.status(200).json({

    success: true,

    data: tax,

  });

});


 
// @desc    Update Tax
// @route   PUT /api/tax/:id
// @access  Private (Admin)
 

export const updateTax = asyncHandler(async (req, res) => {

  const { taxName, taxType, percentage, status } = req.body;

  if (!taxName) {
    throw new ApiError(400, "Tax Name is required.");
  }

  if (!taxType) {
    throw new ApiError(400, "Tax Type is required.");
  }

  if (percentage === undefined || percentage === null || percentage === "") {
    throw new ApiError(400, "Tax Percentage is required.");
  }

  const tax = await Tax.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!tax) {

    throw new ApiError(404, "Tax not found.");

  }

  const duplicate = await Tax.findOne({

    taxName: taxName.trim().toUpperCase(),

    companyId: req.user.companyId,

    isDeleted: false,

    _id: { $ne: req.params.id },

  });

  if (duplicate) {

    throw new ApiError(400, "Tax already exists.");

  }

  tax.taxName = taxName.trim().toUpperCase();

  tax.taxType = taxType;

  tax.percentage = percentage;

  tax.status = status;

  tax.modifyUserId = req.user._id;

  tax.modifyDate = new Date();

  await tax.save();

  res.status(200).json({

    success: true,

    message: "Tax updated successfully.",

    data: tax,

  });

});


 
// @desc    Delete Tax
// @route   DELETE /api/tax/:id
// @access  Private (Admin)
 

export const deleteTax = asyncHandler(async (req, res) => {

  const tax = await Tax.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!tax) {

    throw new ApiError(404, "Tax not found.");

  }

  tax.isDeleted = true;

  tax.modifyUserId = req.user._id;

  tax.modifyDate = new Date();

  await tax.save();

  res.status(200).json({

    success: true,

    message: "Tax deleted successfully.",

  });

});