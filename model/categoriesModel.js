import mongoose from "mongoose";
import softDeletePlugin from "../vendor/mongoosePlugin/softDelete.js";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "name must be unique"],
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

categoriesSchema.plugin(softDeletePlugin);
categoriesSchema.plugin(paginatePlugin);

const Categories = mongoose.model("categories", categoriesSchema);

export default Categories;
