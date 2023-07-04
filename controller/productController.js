import { successResponse } from "../vendor/response.js";

import Product from "../model/productModel.js";
import validate from "../vendor/validator.js";
import CustomError from "../vendor/customError.js";
import { saveFile, uploadFile } from "../vendor/uploadFile.js";
import { deleteFile } from "../vendor/uploadFile.js";

export const add = async (req, res) => {
  validate(req.body, {
    name: { required: true, type: String },
    price: { required: true, type: Number, min: 0 },
    category: { required: true, type: String },
    maxRevision: { required: true, type: Number, min: 0 },
    descryption: { type: String },
    dayWork: { required: true, type: Number, min: 0 },
  });

  let productFileUrl = [];
  if (req.files.productFile) {
    if (Array.isArray(req.files.productFile)) {
      req.files.productFile.forEach((product) => {
        productFileUrl.push(uploadFile(product));
      });
    } else {
      productFileUrl.push(uploadFile(req.files.productFile));
    }
  }

  const newProduct = await Product.create({
    name: req.body.name,
    price: req.body.price,
    productUrl: productFileUrl.map((product) => product.filePath),
    category: req.body.category,
    maxRevision: req.body.maxRevision,
    descryption: req.body.descryption,
    dayWork: req.body.dayWork,
  });

  for (const file of productFileUrl) {
    saveFile(file);
  }

  res.json(successResponse(newProduct));
};

export const list = async (req, res) => {
  if (req.query.search) {
    req.auth.filter = {
      ...req.auth.filter,
      name: { $regex: req.query.search, $options: "i" },
    };
  }
  if (req.query.category) {
    req.auth.filter = {
      ...req.auth.filter,
      category: req.query.category,
    };
  }
  const productFind = await Product.paginate(req.auth.filter, req.query, {
    populate: "category",
    sort: { createdAt: "desc" },
  });

  res.json(successResponse(productFind));
};

export const total = async (req, res) => {
  const productFind = await Product.countDocuments();

  res.json(successResponse(productFind));
};

export const detail = async (req, res) => {
  const productFind = await Product.findOne({
    _id: req.params.product_id,
  })
    .populate("category")
    .orFail(new CustomError("Product not found", 404));

  res.json(successResponse(productFind));
};

export const update = async (req, res) => {
  validate(req.body, {
    name: { required: true, type: String },
    price: { required: true, type: Number, min: 0 },
    category: { required: true, type: String },
    maxRevision: { required: true, type: Number, min: 0 },
    descryption: { type: String },
    dayWork: { required: true, type: Number, min: 0 },
  });

  const productFind = await Product.findOne({
    _id: req.params.product_id,
  }).orFail(new CustomError("Product not found", 404));

  let productFileUrl = [];
  if (req.files.productFile) {
    if (Array.isArray(req.files.productFile)) {
      req.files.productFile.forEach((product) => {
        productFileUrl.push(uploadFile(product));
      });
    } else {
      productFileUrl.push(uploadFile(req.files.productFile));
    }
  }

  productFind.productUrl.forEach((product) => {
    deleteFile(product);
  });

  productFind.productUrl = productFileUrl.map((product) => product.filePath);

  productFind.name = req.body.name;
  productFind.price = req.body.price;
  productFind.category = req.body.category;
  productFind.maxRevision = req.body.maxRevision;
  productFind.descryption = req.body.descryption;
  productFind.dayWork = req.body.dayWork;

  const updateProduct = await productFind.save();

  if (req.files.productFile) {
    productFileUrl.forEach((file) => {
      saveFile(file);
    });
  }

  res.json(successResponse(updateProduct, "Product updated"));
};

export const remove = async (req, res) => {
  const productData = await Product.softDelete({ _id: req.params.product_id });

  res.json(successResponse(productData, "Product deleted"));
};
