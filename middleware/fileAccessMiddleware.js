import fs from "fs";
import CustomError from "../vendor/customError.js";
import path from "path";
import User from "../model/userModel.js";

export const publicFile = (req, res) => {
  const filePath = `./storage/public/${req.params.mimeType}/${req.params.fileName}`;

  if (!fs.existsSync(filePath)) {
    throw new CustomError(`File ${req.params.fileName} not found`, 404);
  }
  res.sendFile(path.resolve(filePath));
};

export const privateFile = async (req, res) => {
  const filePath = `./storage/private/${req.params.mimeType}/${req.params.fileName}`;

  if (!fs.existsSync(filePath)) {
    throw new CustomError(`File ${req.params.fileName} not found`, 404);
  }

  if (req.auth.status !== "admin") {
    const userFind = await User.findOne({ _id: req.auth?._id })
      .populate("collections")
      .orFail(new CustomError("Forbidden", 403));

    let fileAccess = false;

    for (let i = 0; i < userFind.collections.length; i++) {
      const collection = userFind.collections[i];
      if (
        collection.productUrl.includes(
          `private/${req.params.mimeType}/${req.params.fileName}`
        )
      ) {
        fileAccess = true;
        break;
      }
    }
    if (!fileAccess) {
      throw new CustomError("Forbidden", 403);
    }
  }
  res.sendFile(path.resolve(filePath));
};
