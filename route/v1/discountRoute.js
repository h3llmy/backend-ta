import express from "express";
import "express-async-errors";
import {
  add,
  list,
  detail,
  update,
  remove,
  select,
} from "../../controller/discountController.js";
import { isAdmin, protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", isAdmin, add);
router.get("/list", list);
router.get("/select/:product_id", select);
router.get("/detail/:discount_id", detail);
router.put("/update/:discount_id", isAdmin, update);
router.delete("/delete/:discount_id", isAdmin, remove);

export default router;
