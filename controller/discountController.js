import { successResponse } from "../vendor/response.js";

import Discount from "../model/discountModel.js";
import validate from "../vendor/validator.js";
import CustomError from "../vendor/customError.js";
import Product from "../model/productModel.js";

export const add = async (req, res) => {
  validate(req.body, {
    product: { required: true, type: String },
    name: { required: true, type: String },
    percentage: { required: true, type: Number, min: 0, max: 100 },
    startAt: { required: true, type: Date },
    expiredAt: { required: true, type: Date },
  });

  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  if (new Date(req.body.startAt) < date) {
    throw new CustomError(`error validations`, 400, {
      startAt: "startAt cannot be lower than today",
    });
  }
  if (new Date(req.body.startAt) > new Date(req.body.expiredAt)) {
    throw new CustomError(`error validations`, 400, {
      startAt: "startAt cannot be lower than expiredAt",
    });
  }

  await Product.findOne({ _id: req.body.product }).orFail(
    new CustomError("product not found", 400)
  );

  const discountCheck = await Discount.findOne({
    product: req.body.product,
    expiredAt: { $gte: new Date() },
  });
  if (discountCheck) {
    throw new CustomError(`error validations`, 400, {
      product: `Product already have discount named ${discountCheck.name}`,
    });
  }
  const newDiscount = await Discount.create({
    product: req.body.product,
    name: req.body.name,
    percentage: req.body.percentage,
    startAt: req.body.startAt,
    expiredAt: req.body.expiredAt,
  });

  res.json(successResponse(newDiscount));
};

export const list = async (req, res) => {
  let filters = {
    ...req.auth.filter,
    product: { $exists: true },
  };
  if (req.auth.status !== "admin") {
    filters = {
      ...filters,
      $and: [
        { startAt: { $lte: new Date() } },
        { expiredAt: { $gte: new Date() } },
      ],
    };
  }
  if (req.query?.isActive?.toLowerCase() === "true") {
    filters = {
      ...filters,
      $and: [
        { startAt: { $lte: new Date() } },
        { expiredAt: { $gte: new Date() } },
      ],
    };
  }
  if (req.query.search) {
    filters = {
      ...filters,
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { "product.name": { $regex: req.query.search, $options: "i" } },
      ],
    };
  }

  const discountFind = await Discount.paginate(filters, req.query, {
    populate: "product",
    sort: { createdAt: "desc" },
  });

  res.json(successResponse(discountFind));
};

export const select = async (req, res) => {
  const discountFind = await Discount.findOne({
    product: req.params.product_id,
    $and: [
      { startAt: { $lte: new Date() } },
      { expiredAt: { $gte: new Date() } },
    ],
  }).orFail(new CustomError("Discount not found", 404));

  res.json(successResponse(discountFind));
};

export const detail = async (req, res) => {
  const discountFind = await Discount.findOne({
    _id: req.params.discount_id,
  })
    .populate("product")
    .orFail(new CustomError("Discount not found", 404));

  res.json(successResponse(discountFind));
};

export const update = async (req, res) => {
  validate(req.body, {
    product: { required: true, type: String },
    name: { required: true, type: String },
    percentage: { required: true, type: Number, min: 0, max: 100 },
    startAt: { required: true, type: Date },
    expiredAt: { required: true, type: Date },
  });
  const productCheck = await Product.findOne({ _id: req.body.product });
  if (!productCheck) {
    throw new CustomError("product not found", 400);
  }
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  if (new Date(req.body.startAt) < date) {
    throw new CustomError(`error validations`, 400, {
      startAt: "startAt cannot be lower than today",
    });
  }
  if (new Date(req.body.startAt) > new Date(req.body.expiredAt)) {
    throw new CustomError(`error validations`, 400, {
      expiredAt: "expiredAt cannot be lower than expiredAt",
    });
  }
  const checkProductDiscount = await Discount.findOne({
    product: req.body.product,
    _id: { $ne: req.params.discount_id },
    $or: [
      { startAt: { $gte: new Date() } },
      { expiredAt: { $lt: new Date() } },
    ],
  });

  if (checkProductDiscount) {
    throw new CustomError(`error validations`, 400, {
      product: `Product already have discount named ${checkProductDiscount.name}`,
    });
  }
  const discountFind = await Discount.findOne({
    _id: req.params.discount_id,
  }).orFail(new CustomError("Discount not found", 404));

  discountFind.product = req.body.product;
  discountFind.name = req.body.name;
  discountFind.percentage = req.body.percentage;
  discountFind.startAt = req.body.startAt;
  discountFind.expiredAt = req.body.expiredAt;

  const updateDiscount = await discountFind.save();

  res.json(successResponse(updateDiscount, "Discount updated"));
};

export const remove = async (req, res) => {
  const discountData = await Discount.softDelete({
    _id: req.params.discount_id,
  });

  res.json(successResponse(discountData, "Discount deleted"));
};
