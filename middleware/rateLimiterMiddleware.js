import { rateLimit } from "express-rate-limit";
import CustomError from "../vendor/customError.js";

export default rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    throw new CustomError("Too many requests, please try again later.", 429);
  },
});
