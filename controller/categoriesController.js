import { successResponse } from "../vendor/response.js";

import Categories from "../model/categoriesModel.js";
import validate from "../vendor/validator.js";
import CustomError from "../vendor/customError.js";

export const add = async (req, res) => {
  validate(req.body, {
    name: { required: true, type: String },
  });
  const newCategories = await Categories.create({
    name: req.body.name,
  });

  res.json(successResponse(newCategories));
};

export const list = async (req, res) => {
  if (req.query.search) {
    req.auth.filter = {
      ...req.auth.filter,
      name: { $regex: req.query.search, $options: "i" },
    };
  }
  const categoriesFind = await Categories.paginate(req.auth.filter, req.query);

  if (req.auth.status !== "admin") {
    categoriesFind.list.map((category) => {
      category.sold = undefined;
      return category;
    });
  }

  res.json(successResponse(categoriesFind));
};

export const total = async (req, res) => {
  const categoriesFind = await Categories.countDocuments();

  res.json(successResponse(categoriesFind));
};

export const detail = async (req, res) => {
  const categoriesFind = await Categories.findOne({
    _id: req.params.categories_id,
  }).orFail(new CustomError("Categories not found", 404));

  res.json(successResponse(categoriesFind));
};

export const update = async (req, res) => {
  validate(req.body, {
    name: { required: true, type: String },
  });
  const categoriesFind = await Categories.findOne({
    _id: req.params.categories_id,
  }).orFail(new CustomError("Categories not found", 404));

  categoriesFind.name = req.body.name;

  const updateCategories = await categoriesFind.save();

  res.json(successResponse(updateCategories, "Categories updated"));
};

export const remove = async (req, res) => {
  const categoriesData = await Categories.softDelete({
    _id: req.params.categories_id,
  });

  res.json(successResponse(categoriesData, "Categories deleted"));
};
