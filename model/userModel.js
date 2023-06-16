import mongoose from "mongoose";
import { emailCheck } from "../vendor/validator.js";
import { comparePassword, hasPassword } from "../service/bcrypt.js";
import softDeletePlugin from "../vendor/mongoosePlugin/softDelete.js";
import paginatePlugin from "../vendor/mongoosePlugin/pagination.js";
import Collection from "./collectionModel.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: emailCheck,
        message: "invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Collection,
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    otp: {
      type: String,
    },
    validator: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hasedPassword = await hasPassword(this.password);
    this.password = hasedPassword;
  }
  next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return comparePassword(enteredPassword, this.password);
};

userSchema.plugin(softDeletePlugin);
userSchema.plugin(paginatePlugin);

const User = mongoose.model("user", userSchema);

export default User;
