import express from "express";
import router from "../route/route.js";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { errorHanddlerMiddleware } from "../middleware/errorHanddlerMiddleware.js";
import compression from "compression";
import { auth, protect } from "../middleware/authMiddleware.js";
import rateLimiterMiddleware from "../middleware/rateLimiterMiddleware.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { privateFile, publicFile } from "../middleware/fileAccessMiddleware.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(fileUpload(), (req, res, next) => {
  if (!req.files) {
    req.files = {};
  }
  next();
});
app.use(express.json());
app.use(auth);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/public/:mimeType/:fileName", publicFile);
app.get("/private/:mimeType/:fileName", privateFile);
// app.use(express.static("public"));
app.use(ExpressMongoSanitize());
app.use(rateLimiterMiddleware);

app.use("/api/v1", router);

app.use(errorHanddlerMiddleware);

export default app;
