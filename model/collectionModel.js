import mongoose from "mongoose";
import softDeletePlugin from "../vendor/mongoosePlugin/softDelete.js";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";

const collectionSchema = new mongoose.Schema(
  {
    productUrl: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

collectionSchema.plugin(softDeletePlugin);
collectionSchema.plugin(paginatePlugin);

const Collection = mongoose.model("collection", collectionSchema);

export default Collection;
