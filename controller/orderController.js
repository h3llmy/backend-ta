import { successResponse } from "../vendor/response.js";

import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";
import validate from "../vendor/validator.js";
import CustomError from "../vendor/customError.js";
import { deleteFile, saveFile, uploadFile } from "../vendor/uploadFile.js";
import sendMail from "../service/nodeMailler.js";
import User from "../model/userModel.js";
import createCsv from "../vendor/createCsv.js";
import Discount from "../model/discountModel.js";
import { generatePayment, updatePayment } from "../service/paymentMidtrans.js";
import mongoose from "mongoose";
import Collection from "../model/collectionModel.js";
import Categories from "../model/categoriesModel.js";

export const add = async (req, res) => {
  validate(req.body, {
    productId: { required: true, type: String },
    discountId: { type: String },
    note: { required: true, type: String },
  });

  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    const productFind = await Product.findOne({
      _id: req.body.productId,
    })
      .populate("category")
      .orFail(new CustomError("Product not found", 404));

    let price = productFind.price;
    let discount;

    if (req.body.discountId) {
      const discountFind = await Discount.findOne({
        _id: req.body.discountId,
        startAt: { $lte: new Date() },
        expiredAt: { $gte: new Date() },
      }).orFail(new CustomError("Discount not found", 422));

      price = price - Math.round((price * discountFind.percentage) / 100);
      discount = {
        discountId: discountFind._id,
        name: discountFind.name,
        percentage: discountFind.percentage,
      };
    }

    const newOrder = await Order.create({
      customer: req.auth._id,
      productId: productFind._id,
      productName: productFind.name,
      productCategoryId: productFind.category._id,
      productCategory: productFind.category.name,
      dayWork: productFind.dayWork,
      note: req.body.note,
      price: price,
      maxRevision: productFind.maxRevision,
      discount: discount,
      status: {
        ordered: new Date(),
      },
    });

    const paymentPayload = {
      transaction_details: {
        order_id: newOrder._id,
        gross_amount: newOrder.price,
      },
      item_details: [
        {
          id: productFind._id,
          price: newOrder.price,
          quantity: 1,
          name: newOrder.productName,
          category: newOrder.productCategory,
        },
      ],
    };

    const payment = await generatePayment(paymentPayload);
    await session.commitTransaction();
    res.json(successResponse(payment));
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const notification = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const ordersFind = await Order.find({
      orderStatus: {
        $in: ["progress"],
      },
      deadline: {
        $lt: today,
        $gte: yesterday,
      },
    }).populate("customer");

    const adminFind = await User.findOne({ status: "admin" });

    for (const order of ordersFind) {
      const emailHeader = {
        to: adminFind.email,
        subject: "Order Deadline",
        html: {
          orderId: order._id,
          customer: order.customer.username,
          productName: order.productName,
          orderStatus: order.orderStatus,
        },
      };
      sendMail(emailHeader, "orderDeadline.html");
    }
  } catch (error) {
    console.error(error);
  }
};

export const list = async (req, res) => {
  let filters = {
    ...req.auth.filter,
  };
  if (req.query.orderStatus) {
    filters = { ...filters, orderStatus: req.query.orderStatus };
  }
  if (req.auth.status !== "admin") {
    filters = { ...filters, customer: req.auth.id };
  }
  if (req.query.search) {
    filters = {
      ...filters,
      $or: [{ productName: { $regex: req.query.search, $options: "i" } }],
    };
  }
  if (req.query.datefrom || req.query.dateuntil) {
    const fromDate = req.query.datefrom ? new Date(req.query.datefrom) : null;
    const untilDate = req.query.dateuntil
      ? new Date(req.query.dateuntil)
      : null;

    if (fromDate && untilDate && fromDate > untilDate) {
      throw new CustomError("Error validations", 400, {
        from: "From date cannot be greater than until date",
      });
    }

    if (fromDate && fromDate > new Date()) {
      throw new CustomError("Error validations", 400, {
        from: "From date cannot be greater than today",
      });
    }

    const dateFilter = {};

    if (fromDate) {
      dateFilter["$gte"] = fromDate;
    }

    if (untilDate) {
      dateFilter["$lte"] = untilDate;
    }

    filters = {
      ...filters,
      createdAt: dateFilter,
    };
  }
  const orderFind = await Order.paginate(filters, req.query, {
    populate: ["customer", "productId"],
    sort: { createdAt: "desc" },
  });

  res.json(successResponse(orderFind));
};

export const listPerMonth = async (req, res) => {
  const currentYear = new Date().getFullYear();
  const orderFind = await Order.aggregate([
    {
      $match: {
        "status.done": { $exists: true },
        "status.done": {
          $gte: new Date(`${currentYear}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$status.done" },
        totalIncome: { $sum: "$price" },
      },
    },
  ]);

  const monthNamesMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "Mei",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Okt",
    11: "Nov",
    12: "Des",
  };
  const orderFormat = [];

  orderFind.forEach((product) => {
    orderFormat.push({
      month: monthNamesMap[product._id],
      totalIncome: product.totalIncome,
    });
  });

  for (let i = 1; i <= 12; i++) {
    const existingMonth = orderFormat.find(
      (order) => order.month === monthNamesMap[i]
    );
    if (!existingMonth) {
      orderFormat.push({
        month: monthNamesMap[i],
        totalIncome: 0,
      });
    }
  }

  orderFormat.sort(
    (a, b) =>
      Object.values(monthNamesMap).indexOf(a.month) -
      Object.values(monthNamesMap).indexOf(b.month)
  );

  res.json(successResponse(orderFormat));
};

export const listPerYear = async (req, res) => {
  const currentYear = new Date().getFullYear();
  const tenYearsAgo = currentYear - 10;

  const orderFind = await Order.aggregate([
    {
      $match: {
        "status.done": { $exists: true },
        "status.done": {
          $gte: new Date(`${tenYearsAgo}-01-01`),
          $lte: new Date(`${currentYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $year: "$status.done" },
        totalIncome: { $sum: "$price" },
      },
    },
  ]);

  const orderFormat = orderFind.map((order) => ({
    year: order._id,
    totalIncome: order.totalIncome,
  }));

  orderFormat.sort((a, b) => a.year - b.year);

  res.json(successResponse(orderFormat));
};

export const total = async (req, res) => {
  const orderFind = await Order.countDocuments();

  res.json(successResponse(orderFind));
};

export const detail = async (req, res) => {
  let filter = { _id: req.params.order_id };
  if (req.auth.status !== "admin") {
    filter = { ...filter, customer: req.auth._id };
  }

  const orderFind = await Order.findOne(filter)
    .populate("customer")
    .orFail(new CustomError("Order not found", 404));

  res.json(successResponse(orderFind));
};

export const createReport = async (req, res) => {
  validate(req.body, {
    from: { type: Date },
    until: { type: Date },
  });

  let filter = { orderStatus: "done" };
  if (req.body.from || req.body.until) {
    const fromDate = req.body.from ? new Date(req.body.from) : null;
    const untilDate = req.body.until ? new Date(req.body.until) : null;

    if (fromDate && untilDate && fromDate > untilDate) {
      throw new CustomError("Error validations", 400, {
        from: "From date cannot be greater than until date",
      });
    }

    if (fromDate && fromDate > new Date()) {
      throw new CustomError("Error validations", 400, {
        from: "From date cannot be greater than today",
      });
    }

    const dateFilter = {};

    if (fromDate) {
      dateFilter["$gte"] = fromDate;
    }

    if (untilDate) {
      dateFilter["$lte"] = untilDate;
    }

    filter = {
      ...filter,
      "status.done": dateFilter,
    };
  }

  const fileName = "report-" + Date.now();

  const orderFind = Order.find(filter)
    .populate("customer")
    .cursor({ batchSize: 100 });

  let totalIncome = 0;

  orderFind.on("data", async (order) => {
    createCsv(fileName, {
      Customer: order.customer.username,
      "Product Name": order.productName,
      "Product Category": order.productCategory,
      "Discount Name": order.discount.name || "",
      "Discount Percentage": order.discount.percentage || "",
      "Order Date": order.createdAt.toDateString(),
      Price: order.price,
    });
    totalIncome += order.price;
  });

  orderFind.on("end", () => {
    const report = createCsv(fileName, {
      Customer: "",
      "Product Name": "",
      "Product Category": "",
      "Discount Name": "",
      "Discount Percentage": "",
      "Order Date": "Total Income",
      totalIncome: totalIncome,
    });
    res.json(successResponse(report));
    setTimeout(() => {
      deleteFile(report.fileUrl);
    }, 3000);
  });
};

export const updateRevision = async (req, res) => {
  validate(req.body, {
    revisionNote: { type: String, required: true },
  });

  const orderFind = await Order.findOne({
    _id: req.params.order_id,
    customer: req.auth._id,
  }).orFail(new CustomError("Order not found", 404));

  if (orderFind.orderStatus !== "sended") {
    new CustomError(`order already ${orderFind.orderStatus}`, 400);
  }

  if (orderFind.maxRevision < orderFind.totalRevision) {
    new CustomError(`revision reach limit ${orderFind.maxRevision} times`, 400);
  }

  orderFind.totalRevision += 1;
  orderFind.revisionNote.push(req.body.revisionNote);
  orderFind.orderStatus = "revision";
  orderFind.status.revision = new Date();
  await orderFind.save();

  res.json(successResponse(orderFind, "Order updated"));
};

export const updatePreview = async (req, res) => {
  validate(req.files, {
    productPreview: { required: true },
  });
  const orderFind = await Order.findOne({ _id: req.params.order_id })
    .populate("customer")
    .orFail(new CustomError("Order not found", 404));

  if (orderFind.orderStatus === "done") {
    throw new CustomError(`order already ${orderFind.orderStatus}`);
  }

  let file;
  if (Number(orderFind.maxRevision) - Number(orderFind.totalRevision) <= 0) {
    file = uploadFile(req.files.productPreview, { isPrivate: true });
  } else {
    file = uploadFile(req.files.productPreview);
  }

  if (orderFind.productPreview) {
    deleteFile(orderFind.productPreview);
  }

  if (Number(orderFind.maxRevision) - Number(orderFind.totalRevision) <= 0) {
    orderFind.orderStatus = "done";
    orderFind.status.done = new Date();

    const newCollection = await Collection.create({
      productUrl: file.filePath,
      productName: orderFind.productName,
      productCategory: orderFind.productCategory,
    });
    const userFind = await User.findOne({
      _id: orderFind.customer._id,
    });
    userFind.collections.push(newCollection._id);
    orderFind.productPreview = undefined;
    await userFind.save();
  } else {
    orderFind.productPreview = file.filePath;
    orderFind.orderStatus = "sended";
  }

  const updateOrder = await orderFind.save();

  saveFile(file);

  res.json(successResponse(updateOrder, "Preview uploaded"));
};

export const updateDone = async (req, res) => {
  validate(req.files, {
    proudctFile: { required: true },
  });

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const orderFind = await Order.findOne({
      _id: req.params.order_id,
    }).orFail(new CustomError("order not found", 404));

    if (orderFind.orderStatus !== "accept") {
      throw new CustomError("order must accept first before done", 400);
    }

    orderFind.orderStatus = "done";
    orderFind.status.done = new Date();

    const file = uploadFile(req.files.proudctFile, { isPrivate: true });

    const categoryFind = await Categories.findOne({
      _id: orderFind.productCategoryId,
    });

    categoryFind.sold += 1;
    await categoryFind.save();

    const newCollection = await Collection.create({
      productUrl: file.filePath,
      productName: orderFind.productName,
      productCategory: orderFind.productCategory,
    });

    const user = await User.findOne({
      _id: orderFind.customer,
    });

    deleteFile(orderFind?.productPreview);
    orderFind.productPreview = undefined;

    await orderFind.save();

    user.collections.push(newCollection._id);
    await user.save();
    saveFile(file);
    await session.commitTransaction();
    res.json(successResponse(orderFind));
  } catch (error) {
    session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const updateAccept = async (req, res) => {
  const params = validate(req.params, {
    order_id: { type: String },
  });

  const orderFind = await Order.findOne({
    _id: params.order_id,
    orderStatus: "sended",
    customer: req.auth._id,
  }).orFail(new CustomError("Order not found", 404));

  orderFind.orderStatus = "accept";
  orderFind.status.accept = new Date();

  const updateOrder = await orderFind.save();
  res.json(successResponse(updateOrder, "Order updated"));
};

export const updateProgress = async (req, res) => {
  const orderFind = await Order.findOne({
    _id: req.params.order_id,
  });

  const currentDate = new Date();
  const deadlineDate = new Date();
  deadlineDate.setDate(currentDate.getDate() + orderFind.dayWork);

  orderFind.orderStatus = "progress";
  orderFind.status.progress = currentDate;
  orderFind.deadline = deadlineDate;
  await orderFind.save();
  res.json(successResponse(orderFind));
};

export const paymentCallback = async (req, res) => {
  const paymentCheck = await updatePayment({
    transaction_id: req.body.transaction_id,
  });

  const orderFInd = await Order.findOne({
    _id: paymentCheck.order_id,
  });

  switch (paymentCheck.transaction_status) {
    case "settlement":
      orderFInd.orderStatus = "paid";
      orderFInd.status.paid = new Date();
      break;
    case "capture":
      orderFInd.orderStatus = "paid";
      orderFInd.status.paid = new Date();
      break;
    case "deny":
      orderFInd.orderStatus = "cancelled";
      orderFInd.status.cancelled = new Date();
      break;
    case "cancel":
      orderFInd.orderStatus = "cancelled";
      orderFInd.status.cancelled = new Date();
      break;
    case "expire":
      orderFInd.orderStatus = "failed";
      orderFInd.status.failed = new Date();
      break;
    case "failure":
      orderFInd.orderStatus = "failed";
      orderFInd.status.failed = new Date();
      break;
  }
  await orderFInd.save();
  res.end();
};
