import users from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createAccount = async (payload) => {
  const { firstName, lastName, email, role } = payload;

  if (!firstName || !lastName || !payload.password || !email || !role) {
    return {
      message: "Missing required fields",
      statusCode: 400,
      status: "failure",
    };
  }

  const foundEmail = await users.findOne({ email: email });
  if (foundEmail) {
    return {
      message: "Account already exists",
      statusCode: 400,
      status: "failure",
    };
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  const newUser = await users.create(payload);
  return {
    message: "Account created successfully",
    statusCode: 201,
    status: "success",
    data: newUser,
  };
};

const login = async (payload) => {
  const { email, password } = payload;
  const foundAccount = await users.findOne({ email: email }).lean();
  if (!foundAccount) {
    return {
      message: "Account does not exist",
      statusCode: 404,
      status: "failure",
    };
  }

  const passwordMatch = await bcrypt.compare(password, foundAccount.password);
  if (!passwordMatch) {
    return {
      message: "Passwords do not match",
      statusCode: 400,
      status: "failure",
    };
  }
  const token = jwt.sign(
    {
      _id: foundAccount._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  foundAccount.accessToken = token;
  return {
    message: "Login Successful",
    statusCode: 200,
    status: "success",
    data: foundAccount,
  };
};

export default {
  createAccount,
  login,
};
