import mongoose from "mongoose";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";
import Product from "./productModel.js";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productPreview: {
      type: String,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productCategoryId: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    revisionNote: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalRevision: {
      type: Number,
      default: 0,
    },
    maxRevision: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
    },
    discount: {
      discountId: {
        type: String,
      },
      name: {
        type: String,
      },
      percentage: {
        type: Number,
      },
    },
    orderStatus: {
      type: String,
      enum: [
        "ordered",
        "paid",
        "progress",
        "revision",
        "sended",
        "accept",
        "done",
        "cancelled",
        "failed",
      ],
      default: "ordered",
    },
    status: {
      ordered: {
        type: Date,
      },
      paid: {
        type: Date,
      },
      // admin
      progress: {
        type: Date,
      },
      revision: {
        type: Date,
      },
      accept: {
        type: Date,
      },
      // admin
      done: {
        type: Date,
      },
      cancelled: {
        type: Date,
      },
      failed: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(paginatePlugin);

const Order = mongoose.model("order", orderSchema);

export default Order;
