import express from "express";
import "express-async-errors";
import {
  add,
  list,
  detail,
  update,
  remove,
  total,
} from "../../controller/productController.js";
import { isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", isAdmin, add);
router.get("/list", list);
router.get("/total", total);
router.get("/detail/:product_id", detail);
router.put("/update/:product_id", isAdmin, update);
router.delete("/delete/:product_id", isAdmin, remove);

export default router;
