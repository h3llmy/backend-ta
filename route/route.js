import express from "express";

import authRoute from "./v1/authRoute.js";

import productRoute from "./v1/productRoute.js";
import orderRoute from "./v1/orderRoute.js";
import discountRoute from "./v1/discountRoute.js";
import userRoute from "./v1/userRoute.js";
import categoriesRoute from "./v1/categoriesRoute.js";

const rootRouter = express.Router();

rootRouter.use("/auth", authRoute);

rootRouter.use("/product", productRoute);
rootRouter.use("/order", orderRoute);
rootRouter.use("/discount", discountRoute);
rootRouter.use("/user", userRoute);
rootRouter.use("/categories", categoriesRoute);

export default rootRouter;
