import mongoose from "mongoose";
import CustomError from "../customError.js";

export default function softDeletePlugin(schema, options) {
  try {
    schema.statics.softDelete = async function (docId) {
      const deletedSchema = new mongoose.Schema(
        {
          deletedAt: { type: Date },
        },
        { _id: false, versionKey: false }
      );

      schema.add(deletedSchema);

      const schemaFind = await this.findOneAndUpdate(
        docId,
        {
          deletedAt: new Date(),
        },
        { new: true }
      ).orFail(new CustomError(this.modelName + " not found", 404));
      return schemaFind;
    };

    schema.pre(
      [
        "find",
        "findOne",
        "findOneAndUpdate",
        "countDocuments",
        "findOneAndDelete",
        "findOneAndRemove",
        "findOneAndReplace",
      ],
      function () {
        this.where({ deletedAt: null });
      }
    );

    return schema;
  } catch (error) {
    throw new Error(error);
  }
}
