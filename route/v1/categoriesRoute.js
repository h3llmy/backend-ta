import express from "express";
import "express-async-errors";
import {
  add,
  list,
  detail,
  update,
  remove,
  total,
} from "../../controller/categoriesController.js";
import { isAdmin, protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, add);
router.get("/list", list);
router.get("/total", total);
router.get("/detail/:categories_id", detail);
router.put("/update/:categories_id", protect, update);
router.delete("/delete/:categories_id", protect, remove);

export default router;
