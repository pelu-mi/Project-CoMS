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
  const { courseId } = payload;
  const foundCourse = await course.findOne({ _id: courseId });
  return {
    message: "Courses details displayed below",
    statusCode: 200,
    status: "success",
    data: foundCourse,
  };
}

async function getAllCourseContent(payload) {
  const { courseId } = payload;
  const foundContent = await courseContent.find({ course: courseId });
  if (!foundContent) {
    return {
      message: "Course not found",
      statusCode: 200,
      status: "success",
      data: foundCourse,
    };
  }
  return {
    message: "Courses contents displayed below",
    statusCode: 200,
    status: "success",
    data: foundContent,
  };
}

async function addCourseContent(payload) {
  const { title, description, link } = payload;
  const newContent = await courseContent.create(payload);
  return {
    message: "Course Content Created Successfully",
    statusCode: 200,
    status: "success",
    data: newContent,
  };
}

async function addStudents(payload) {
  await course.findByIdAndUpdate(
    payload.courseId,
    { $addToSet: { "students.relatedIds": { $each: payload.studentIds } } },
    { new: true, useFindAndModify: false }
  );
  const populatedCourse = await course
    .findById(payload.courseId)
    .populate("students.relatedIds");

  return {
    message: "Students registered Successfully",
    statusCode: 200,
    status: "success",
    data: populatedCourse,
  };
}
async function editCourse(payload) {
  // Find the course by ID and update it with the provided payload
  const updatedCourse = await course.findByIdAndUpdate(
    payload.courseId,
    { $set: payload }, // Update the fields provided in the payload
    { new: true, useFindAndModify: false }
  );

  // Check if the course was found and updated
  if (!updatedCourse) {
    return {
      message: "Course not found",
      statusCode: 404,
      status: "failure",
    };
  }

  return {
    message: "Course updated successfully",
    statusCode: 200,
    status: "success",
    data: updatedCourse,
  };
}

async function editCourseContent(payload) {
  // Find the course by ID and update it with the provided payload
  const updatedCourseContent = await courseContent.findByIdAndUpdate(
    payload.courseContentId,
    { $set: payload }, // Update the fields provided in the payload
    { new: true, useFindAndModify: false }
  );

  // Check if the course was found and updated
  if (!updatedCourseContent) {
    return {
      message: "Course content not found",
      statusCode: 404,
      status: "failure",
    };
  }

  return {
    message: "Course Content updated successfully",
    statusCode: 200,
    status: "success",
    data: updatedCourseContent,
  };
}

async function getAllUnregisteredStudents(payload) {
  const courseToAddStudents = await course.findOne({ _id: payload.courseId });
  if (!courseToAddStudents) {
    return {
      message: "Course not found",
      statusCode: 404,
      status: "failure",
    };
  }
  const registeredStudentIds =
    (courseToAddStudents.students && courseToAddStudents.students.relatedIds) ||
    [];

  // Find all students who are not registered for the course
  const unregisteredStudents = await users.find({
    role: "student",
    _id: { $nin: registeredStudentIds },
  });
  return {
    message: "All unregistered students displayed below",
    statusCode: 200,
    status: "success",
    data: unregisteredStudents,
  };
}

async function getAllRegisteredStudents(payload) {
  const { courseId } = payload;
  const presentCourse = await course.findById(courseId);
  if (!course) {
    return {
      message: "Course not found",
      statusCode: 404,
      status: "failure",
    };
  }
  const registeredStudentIds =
    (presentCourse.students && presentCourse.students.relatedIds) || [];

  // Find all registered students
  const registeredStudents = await users.find({
    role: "student",
    _id: { $in: registeredStudentIds },
  });

  return {
    message: "Registered students displayed below",
    statusCode: 200,
    status: "success",
    data: registeredStudents,
  };
}

async function getAllStudents() {
  const students = await users.find({ role: "student" }).lean();
  const noOfStudents = students.length;
  return {
    message: `All ${noOfStudents} students displayed below`,
    statusCode: 200,
    status: "success",
    data: students,
  };
}

export default {
  createAccount,
  login,
  createCourse,
  getInstructorCourseLIst,
  getCourseDetails,
  addCourseContent,
  addStudents,
  editCourse,
  editCourseContent,
  getAllCourseContent,
  getAllUnregisteredStudents,
  getAllRegisteredStudents,
  getAllStudents,
};
