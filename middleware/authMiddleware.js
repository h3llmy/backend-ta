import User from "../model/userModel.js";
import { decodeToken } from "../service/jwtToken.js";
import CustomError from "../vendor/customError.js";

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      delete req.query.isActive;
      const status = {
        status: "public",
      };
      req.auth = status;
    } else {
      if (authorization && authorization.startsWith("Bearer")) {
        const token = authorization.split(" ")[1];
        const payload = decodeToken(token);
        if (payload.type != "login") {
          throw "invalid authorization";
        }
        const findUser = await User.findById(payload.id).select("_id status");
        if (!findUser) {
          throw "invalid authorization";
        }
        if (findUser.isActive == false) {
          throw "invalid authorization";
        }
        if (findUser.status != "admin") {
          findUser.filter = {};
        }

        req.auth = findUser;
      }
    }
    next();
  } catch (error) {
    next(new CustomError(error, 401));
  }
};

export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw "Unauthorized";
    }
    next();
  } catch (error) {
    next(new CustomError(error, 401));
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.auth.status != "admin") {
      throw "Unauthorized";
    }
    next();
  } catch (error) {
    next(new CustomError(error, 401));
  }
};
