import Customer from "../models/Customer.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// =====================================================
// @desc    Create Customer
// @route   POST /api/customer
// @access  Private (Admin)
// =====================================================

export const createCustomer = asyncHandler(async (req, res) => {

  const {
    customerName,
    customerCode,
    mobile,
    alternateMobile,
    email,
    gstin,
    panNumber,
    address,
    city,
    state,
    country,
    pincode,
    creditLimit,
    openingBalance,
    status,
  } = req.body;

  // =====================================
  // Required Validation
  // =====================================

  if (!customerName)
    throw new ApiError(400, "Customer Name is required.");

  if (!customerCode)
    throw new ApiError(400, "Customer Code is required.");

  if (!mobile)
    throw new ApiError(400, "Mobile Number is required.");

  if (!state)
    throw new ApiError(400, "State is required.");

  // =====================================
  // Duplicate Customer Code
  // =====================================

  const existingCode = await Customer.findOne({
    customerCode: customerCode.trim().toUpperCase(),
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingCode)
    throw new ApiError(400, "Customer Code already exists.");

  // =====================================
  // Duplicate Mobile
  // =====================================

  const existingMobile = await Customer.findOne({
    mobile,
    companyId: req.user.companyId,
    isDeleted: false,
  });

  if (existingMobile)
    throw new ApiError(400, "Mobile Number already exists.");

  // =====================================
  // Create Customer
  // =====================================

  const customer = await Customer.create({

    customerName: customerName.trim().toUpperCase(),

    customerCode: customerCode.trim().toUpperCase(),

    mobile,

    alternateMobile,

    email,

    gstin,

    panNumber,

    address,

    city: city?.trim().toUpperCase(),

    state: state.trim().toUpperCase(),

    country: country?.trim().toUpperCase() || "INDIA",

    pincode,

    creditLimit,

    openingBalance,

    status,

    companyId: req.user.companyId,

    entryUserId: req.user._id,

    entryDate: new Date(),

  });

  res.status(201).json({

    success: true,

    message: "Customer created successfully.",

    data: customer,

  });

});


// =====================================================
// @desc    Get All Customers
// @route   GET /api/customer
// @access  Private
// =====================================================

export const getCustomers = asyncHandler(async (req, res) => {

  const customers = await Customer.find({

    companyId: req.user.companyId,

    isDeleted: false,

  }).sort({ createdAt: -1 });

  res.status(200).json({

    success: true,

    count: customers.length,

    data: customers,

  });

});


// =====================================================
// @desc    Get Customer By ID
// @route   GET /api/customer/:id
// @access  Private
// =====================================================

export const getCustomerById = asyncHandler(async (req, res) => {

  const customer = await Customer.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  res.status(200).json({

    success: true,

    data: customer,

  });

});


// =====================================================
// @desc    Update Customer
// @route   PUT /api/customer/:id
// @access  Private (Admin)
// =====================================================

export const updateCustomer = asyncHandler(async (req, res) => {

  const {
    customerName,
    customerCode,
    mobile,
    alternateMobile,
    email,
    gstin,
    panNumber,
    address,
    city,
    state,
    country,
    pincode,
    creditLimit,
    openingBalance,
    status,
  } = req.body;

  const customer = await Customer.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  // =====================================
  // Duplicate Customer Code
  // =====================================

  const duplicateCode = await Customer.findOne({

    customerCode: customerCode.trim().toUpperCase(),

    companyId: req.user.companyId,

    isDeleted: false,

    _id: { $ne: req.params.id },

  });

  if (duplicateCode)
    throw new ApiError(400, "Customer Code already exists.");

  // =====================================
  // Duplicate Mobile
  // =====================================

  const duplicateMobile = await Customer.findOne({

    mobile,

    companyId: req.user.companyId,

    isDeleted: false,

    _id: { $ne: req.params.id },

  });

  if (duplicateMobile)
    throw new ApiError(400, "Mobile Number already exists.");

  // =====================================
  // Update Customer
  // =====================================

  customer.customerName = customerName.trim().toUpperCase();

  customer.customerCode = customerCode.trim().toUpperCase();

  customer.mobile = mobile;

  customer.alternateMobile = alternateMobile;

  customer.email = email;

  customer.gstin = gstin;

  customer.panNumber = panNumber;

  customer.address = address;

  customer.city = city?.trim().toUpperCase();

  customer.state = state.trim().toUpperCase();

  customer.country = country?.trim().toUpperCase() || "INDIA";

  customer.pincode = pincode;

  customer.creditLimit = creditLimit;

  customer.openingBalance = openingBalance;

  customer.status = status;

  customer.modifyUserId = req.user._id;

  customer.modifyDate = new Date();

  await customer.save();

  res.status(200).json({

    success: true,

    message: "Customer updated successfully.",

    data: customer,

  });

});


// =====================================================
// @desc    Delete Customer
// @route   DELETE /api/customer/:id
// @access  Private (Admin)
// =====================================================

export const deleteCustomer = asyncHandler(async (req, res) => {

  const customer = await Customer.findOne({

    _id: req.params.id,

    companyId: req.user.companyId,

    isDeleted: false,

  });

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  customer.isDeleted = true;

  customer.modifyUserId = req.user._id;

  customer.modifyDate = new Date();

  await customer.save();

  res.status(200).json({

    success: true,

    message: "Customer deleted successfully.",

  });

});