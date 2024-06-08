import users from "../models/users.model.js";
import course from "../models/course.model.js";
import courseContent from "../models/courseContent.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function createAccount(payload) {
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
}

async function login(payload) {
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
      expiresIn: "3d",
    }
  );

  foundAccount.accessToken = token;
  return {
    message: "Login Successful",
    statusCode: 200,
    status: "success",
    data: foundAccount,
  };
}

async function createCourse(user, payload) {
  const { name } = payload;
  const foundCourse = await course.findOne({ name: name });
  if (foundCourse) {
    return {
      message: "Course already exists",
      statusCode: 404,
      status: "failure",
    };
  }
  payload.instructor = user._id;
  const newCourse = await course.create(payload);
  return {
    message: "Course Created Successfully",
    statusCode: 200,
    status: "success",
    data: newCourse,
  };
}

async function getInstructorCourseLIst(user) {
  const foundCourses = await course.find({ instructor: user._id });
  return {
    message: "Courses displayed below",
    statusCode: 200,
    status: "success",
    data: foundCourses,
  };
}

async function getCourseDetails(payload) {
  const { _id } = payload;
  const foundCourse = await course.findOne({ _id: _id });
  return {
    message: "Courses details displayed below",
    statusCode: 200,
    status: "success",
    data: foundCourse,
  };
}

async function addCourseContent(payload) {
  const { title, description, link } = payload;
  const foundContent = await courseContent.findOne({ title: title });
  if (foundContent) {
    return {
      message: "content already exists",
      statusCode: 404,
      status: "failure",
    };
  }
  const newContent = await courseContent.create(payload);
  return {
    message: "Course COntent Created Successfully",
    statusCode: 200,
    status: "success",
    data: newContent,
  };
}

export default {
  createAccount,
  login,
  createCourse,
  getInstructorCourseLIst,
  getCourseDetails,
  addCourseContent,
};
