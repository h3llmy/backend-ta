import express from "express";
import "express-async-errors";
import {
  detail,
  list,
  total,
  update,
  updateStatus,
  userCollections,
} from "../../controller/userController.js";
import { isAdmin, protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/detail", protect, detail);
router.get("/collections", protect, userCollections);
router.get("/list", isAdmin, list);
router.get("/total", total);
router.put("/update-profile", protect, update);
router.put("/update-status/:userId", isAdmin, updateStatus);

export default router;
