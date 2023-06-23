import { successResponse } from "../vendor/response.js";

import User from "../model/userModel.js";
import validate from "../vendor/validator.js";
import CustomError from "../vendor/customError.js";
import { paginations } from "../vendor/mongoosePlugin/pagination.js";

export const detail = async (req, res) => {
  let userId;
  if (req.auth.status === "admin") {
    validate(req.query, {
      userId: { required: true, type: String },
    });
    userId = req.query.userId;
  } else {
    userId = req.auth._id;
  }
  const userFind = await User.findOne({
    _id: userId,
  })
    .select("-password")
    .populate("collections")
    .orFail(new CustomError("User not found", 404));

  res.json(successResponse(userFind));
};

export const list = async (req, res) => {
  let filters = { ...req.auth.filter, status: { $ne: "admin" } };
  if (req.query.search) {
    filters = {
      ...filters,
      $or: [
        { username: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }
  if (req.query.isActive) {
    filters = { ...filters, isActive: req.query.isActive };
  }

  const userFind = await User.paginate(filters, req.query, {
    select: "-password",
  });

  res.json(successResponse(userFind));
};

export const total = async (req, res) => {
  const userFind = await User.countDocuments({ status: { $ne: "admin" } });

  res.json(successResponse(userFind));
};

export const update = async (req, res) => {
  validate(req.body, {
    username: { required: true, type: String },
  });
  const userFind = await User.findOne({ _id: req.atuh._id }).orFail(
    new CustomError("User not found", 404)
  );

  userFind.username = req.body.username;

  const updateUser = await userFind.save();

  res.json(successResponse(updateUser, "User updated"));
};

export const updateStatus = async (req, res) => {
  const userFind = await User.findOne({ _id: req.params.userId })
    .select("-password")
    .orFail(new CustomError("User not found", 404));
  if (userFind.isActive) {
    userFind.isActive = false;
  } else {
    userFind.isActive = true;
  }
  userFind.save();
  res.json(successResponse(userFind, "user status active updated"));
};

export const userCollections = async (req, res) => {
  let filters;
  if (req.query.search) {
    filters = {
      $or: [
        { productName: { $regex: req.query.search, $options: "i" } },
        { productCategory: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }
  const userFind = await User.findOne({ _id: req.auth._id, isActive: true })
    .select("collections")
    .populate({
      path: "collections",
      match: filters,
      options: paginations(req.query),
    })
    .orFail(new CustomError("user not found", 404));

  if (userFind.collections.length <= 0) {
    throw new CustomError("collections not found", 404);
  }

  const collectionTotal = await User.findOne({ _id: req.auth._id })
    .select("collections")
    .populate({ path: "collections", match: filters });

  const totalPages = req.query.limit
    ? Math.ceil(collectionTotal.collections.length / req.query.limit)
    : 1;

  res.json(
    successResponse({
      totalPages,
      currentPage: Number(req.query.page) || 1,
      list: userFind.collections,
    })
  );
};
