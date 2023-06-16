import mongoose from "mongoose";
import softDeletePlugin from "../vendor/mongoosePlugin/softDelete.js";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";
import Product from "./productModel.js";

const discountSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

discountSchema.plugin(softDeletePlugin);
discountSchema.plugin(paginatePlugin);

const Discount = mongoose.model("discount", discountSchema);

export default Discount;
