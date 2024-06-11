import jwt from "jsonwebtoken";
import user from "../models/users.model.js";

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization header must start with 'Bearer '",
        status: "failure",
      });
    }
    const token = authorization.substring(7);

    const decodedUser = await jwt.decode(token);

    const foundUser = await user.findOne({ _id: decodedUser._id });

    if (foundUser.role !== "instructor") {
      return res.status(400).json({
        message: "Only Instructors Allowed",
        status: "failure",
      });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "Unable to authenticate");
  }
};

const studentAuthenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization header must start with 'Bearer '",
        status: "failure",
      });
    }
    const token = authorization.substring(7);

    const decodedUser = await jwt.decode(token);

    const foundUser = await user.findOne({ _id: decodedUser._id });

    if (foundUser.role !== "student") {
      return res.status(400).json({
        message: "Only students Allowed",
        status: "failure",
      });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "Unable to authenticate");
  }
};
export default {
  authenticate,
  studentAuthenticate,
};
