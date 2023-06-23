import express from "express";
import "express-async-errors";
import {
  add,
  list,
  detail,
  updatePreview,
  listPerMonth,
  listPerYear,
  createReport,
  total,
  paymentCallback,
  updateRevision,
  updateAccept,
  updateDone,
  updateProgress,
} from "../../controller/orderController.js";
import { isAdmin, protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, add);
router.get("/list", protect, list);
router.get("/list/permonth", isAdmin, listPerMonth);
router.get("/list/peryear", isAdmin, listPerYear);
router.get("/total", total);
router.get("/detail/:order_id", protect, detail);
router.post("/create-report", isAdmin, createReport);
router.put("/update/progress/:order_id", isAdmin, updateProgress);
router.put("/update/revision/:order_id", protect, updateRevision);
router.put("/update/preview/:order_id", isAdmin, updatePreview);
router.put("/update/accept/:order_id", protect, updateAccept);
router.put("/update/done/:order_id", isAdmin, updateDone);
router.post("/paymentcallback", paymentCallback);

export default router;
