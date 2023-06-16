import mongoose from "mongoose";
import softDeletePlugin from "../vendor/mongoosePlugin/softDelete.js";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";
import Categories from "./categoriesModel.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productUrl: [
      {
        type: String,
        required: true,
      },
    ],
    // aplikasi, foto, video, audio
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Categories,
      required: true,
    },
    maxRevision: {
      type: Number,
      required: true,
    },
    descryption: {
      type: String,
    },
    dayWork: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(softDeletePlugin);
productSchema.plugin(paginatePlugin);

const Product = mongoose.model("product", productSchema);

export default Product;
