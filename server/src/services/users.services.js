/**
 * Import Modules
 */
import users from "../models/users.model.js";
import course from "../models/course.model.js";
import courseContent from "../models/courseContent.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateResetPin from "../utils/generateResetPin.js";
import sendMail from "../utils/sendMail.js";
import discussion from "../models/discussion.model.js";
import comment from "../models/comment.model.js";
/**
 * createAccount - Create new user account
 *
 * @param {Object} payload - Data to use for creating a new account
 * @returns Success or failure status
 */
async function createAccount(payload) {
  const { firstName, lastName, email, role } = payload;

  // Ensure all required fields exist
  if (!firstName || !lastName || !payload.password || !email || !role) {
    return {
      message: "Missing required fields",
      statusCode: 400,
      status: "failure",
    };
  }

  // Check if email exists in database
  const foundEmail = await users.findOne({ email: email });
  if (foundEmail) {
    return {
      message: "Account already exists",
      statusCode: 400,
      status: "failure",
    };
  }

  // Save hashed password instead of raw password
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  // Create new user
  const newUser = await users.create(payload);
  return {
    message: "Account created successfully",
    statusCode: 201,
    status: "success",
    data: newUser,
  };
}

/**
 * login - Login to existing user account
 *
 * @param {Object} payload - Data to use for login to an existing account
 * @returns Success or failure status
 */
async function login(payload) {
  const { email, password } = payload;
  // Check if account exists in db using the email
  const foundAccount = await users.findOne({ email: email }).lean();
  if (!foundAccount) {
    return {
      message: "Account does not exist",
      statusCode: 404,
      status: "failure",
    };
  }

  // Compare password entered against actual password
  const passwordMatch = await bcrypt.compare(password, foundAccount.password);
  if (!passwordMatch) {
    return {
      message: "Passwords do not match",
      statusCode: 400,
      status: "failure",
    };
  }
  // Create JWT token
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

/**
 * createCourse - Create a new course
 *
 * Restricted to instructors
 *
 * @param {Object} user - User trying to create a new course
 * @param {Object} payload - Data to use to create new course
 * @returns Success or Failure status
 */
async function createCourse(user, payload) {
  const { name } = payload;
  // Check if course exists in DB
  const foundCourse = await course.findOne({ name: name });
  if (foundCourse) {
    return {
      message: "Course already exists",
      statusCode: 404,
      status: "failure",
    };
  }
  // Create new course using the payload and instructor information
  payload.instructor = user._id;
  const newCourse = await course.create(payload);
  return {
    message: "Course Created Successfully",
    statusCode: 200,
    status: "success",
    data: newCourse,
  };
}

/**
 * getInstructorCourseList - Get list of courses created by the instructor
 *
 * Restricted to instructors
 *
 * @param {Object} user - instructor trying to get the course list
 * @returns Success or Failure status
 */
async function getInstructorCourseLIst(user) {
  const courses = await course
    .find({ instructor: user._id })
    .populate("discussionCount")
    .exec();

  return {
    message: "Courses displayed below",
    statusCode: 200,
    status: "success",
    data: courses,
  };
}

/**
 * getCourseDetails - Get details of course
 *
 * @param {Object} payload - Details of course to be retrieved
 * @returns Success or Failure status
 */
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

/**
 * getAllCourseContent - Get all course content of course
 *
 * @param {Object} payload - Details of course whose content is to be retrieved
 * @returns Success or Failure status
 */
async function getAllCourseContent(payload) {
  const { courseId } = payload;
  const foundContent = await courseContent.find({ courseId });
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

/**
 * addCourseContent - Add new course content to course
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details of content to be added
 * @returns Success or Failure status
 */
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

/**
 * addStudents - Register students to course
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details of students to be added
 * @returns Success or Failure status
 */
async function addStudents(payload) {
  // Replace the existing student IDs with the new ones
  await course.findByIdAndUpdate(
    payload.courseId,
    { $set: { "students.relatedIds": payload.studentIds } },
    { new: true, useFindAndModify: false }
  );

  // Populate the newly added students
  const addedStudents = await users.find({ _id: { $in: payload.studentIds } });

  return {
    message: "Students registered successfully",
    statusCode: 200,
    status: "success",
    data: addedStudents,
  };
}

/**
 * editCourse - Edit existing course
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details to be set
 * @returns Success or Failure status
 */
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

/**
 * editCourseContent - Edit existing course content
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details of content to be set
 * @returns Success or Failure status
 */
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

/**
 * getAllUnregisteredStudents - Get list of unregistered students in a course
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details of course
 * @returns Success or Failure status
 */
async function getAllUnregisteredStudents(payload) {
  // Check if course exists
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

/**
 * getAllRegisteredStudents - Get list of registered students in a course
 *
 * Restricted to instructors
 *
 * @param {Object} payload - Details of course
 * @returns Success or Failure status
 */
async function getAllRegisteredStudents(payload) {
  const { courseId } = payload;
  // Check if course exists
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

/**
 * getAllStudents - Get list of all students on the platform
 *
 * Restricted to instructors
 *
 * @returns Success or Failure status
 */
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

/**
 * getStudentCourseList - Get list of courses the student is registered in
 *
 * Restricted to students
 *
 * @param {Object} use - Details of student
 * @returns Success or Failure status
 */
async function getStudentCourseList(user) {
  const courses = await course
    .find({ "students.relatedIds": user._id })
    .select("-students") // Exclude the students field
    .populate("discussionCount")
    .exec();
  return {
    message: "Courses retrieved successfully",
    statusCode: 200,
    status: "success",
    data: courses,
  };
}

/**
 * forgotPassword - Request for OTP code from server to reset password
 * 
 * @param {Object} payload - contains user's email
 * @returns  success or failure status
 */
async function forgotPassword(payload) {
  const { email } = payload;
  const foundUser = await users.findOne({ email: email });
  if (!foundUser) {
    return {
      message: "Email not found",
      statusCode: 404,
      status: "failure",
    };
  }
  const resetPin = generateResetPin();
  const updatedUser = await users.findByIdAndUpdate(
    { _id: foundUser._id },
    { resetPin, resetPin },
    { new: true }
  );

  const forgotPasswordPayload = {
    to: updatedUser.email,
    subject: "RESET PASSWORD",
    pin: resetPin,
  };

  sendMail.sendForgotPasswordMail(forgotPasswordPayload);
  return {
    message: "Email sent succesfully",
    statusCode: 200,
    status: "success",
  };
}

/**
 * resetPassword - Reset user password
 * 
 * @param {Object} payload - contains user's email and reset code
 * @returns  success or failure status
 */
const resetPassword = async (payload) => {
  const { email, resetPin } = payload;

  const foundUserAndPin = await users.findOne({
    email: email,
    resetPin: resetPin,
  });

  if (!foundUserAndPin) {
    return {
      message: "Reset pin invalid",
      statusCode: 404,
      status: "failure",
    };
  }

  //hashing new password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  const updatedUser = await users.findByIdAndUpdate(
    { _id: foundUserAndPin._id },
    { password: hashedPassword, resetPin: null },
    { new: true }
  );

  return {
    message: "Password succesfully changed",
    statusCode: 200,
    status: updatedUser,
  };
};

/**
 * updateUser - Update user's information
 * 
 * @param {Object} payload - contains user's information to be changed
 * @returns  success or failure status
 */
async function updateUser(payload) {
  const currentUser = await users.findById(payload._id);
  if (!currentUser) {
    return {
      message: "User not found",
      statusCode: 404,
      status: "failure",
    };
  }

  const updatedUser = await users.findByIdAndUpdate(
    payload._id,
    { $set: payload }, // Update the fields provided in the payload
    { new: true, useFindAndModify: false }
  );

  // Check if the course was found and updated
  if (!updatedUser) {
    return {
      message: "User not found",
      statusCode: 404,
      status: "failure",
    };
  }

  await comment.updateMany(
    { creator: payload._id },
    {
      $set: {
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    }
  );

  await discussion.updateMany(
    { creator: payload._id }, // Match discussions by creator
    {
      $set: {
        firstName: payload.firstName,
        lastName: payload.lastName,
      },
    }
  );

  return {
    message: "User updated successfully",
    statusCode: 200,
    status: "success",
    data: updatedUser,
  };
}

/**
 * createDiscussion - Create a new discussion
 * 
 * @param {Object} user - Contains information of user that wants to create new discussion
 * @param {Object} payload - contains information of discussion to be created
 * @returns  success or failure status
 */
async function createDiscussion(user, payload) {
  payload.creator = user._id;
  payload.firstName = user.firstName;
  payload.lastName = user.lastName;
  const newDiscussion = await discussion.create(payload);
  return {
    message: "Discussion created successfully",
    statusCode: 201,
    status: "success",
    data: newDiscussion,
  };
}

/**
 * createComment - Create a new comment
 * 
 * @param {Object} user - Contains information of user that wants to create new comment
 * @param {Object} payload - contains information of comment to be created
 * @returns  success or failure status
 */
async function createComment(user, payload) {
  payload.creator = user._id;
  payload.firstName = user.firstName;
  payload.lastName = user.lastName;

  const newComment = await comment.create(payload);
  return {
    message: "Comment created successfully",
    statusCode: 201,
    status: "success",
    data: newComment,
  };
}

/**
 * getForumDiscussion - Get all discussions belonging to a course forum
 * 
 * @param {Object} payload - contains information of course
 * @returns  success or failure status
 */
async function getForumDiscussions(payload) {
  const { courseId } = payload;
  const courseName = await course.findById(courseId).select("name");
  if (!courseName) {
    return {
      message: "Course not found",
      statusCode: 400,
      status: "failure",
    };
  }
  const discussions = await discussion.find({
    course: courseId,
    delete: false,
  });
  if (!discussions) {
    return {
      message: "No discussions found",
      statusCode: 400,
      status: "failure",
    };
  }

  return {
    message: "Discussions listed below",
    statusCode: 201,
    status: "success",
    name: courseName.name,
    data: discussions,
  };
}

/**
 * getDiscussionComments - Get all comments belonging to a discussion
 * 
 * @param {Object} payload - contains information of discussion
 * @returns  success or failure status
 */
async function getDiscussionComments(payload) {
  const { discussionId } = payload;
  const discussionName = await discussion.findOne({
    _id: discussionId,
    delete: false,
  });
  if (!discussionName) {
    return {
      message: "discussion not found",
      statusCode: 400,
      status: "failure",
    };
  }
  const comments = await comment.find({
    discussion: discussionId,
    delete: false,
  });
  if (!comments) {
    return {
      message: "No comments found",
      statusCode: 400,
      status: "failure",
    };
  }

  return {
    message: "Comments listed below",
    statusCode: 201,
    status: "success",
    discussionDetails: discussionName,
    data: comments,
  };
}

/**
 * deleteDiscussion - Delete a discussion
 * 
 * @param {Object} payload - contains information of discussion
 * @returns  success or failure status
 */
async function deleteDiscussion(payload) {
  const { discussionId } = payload;

  // Find the discussion by id and update the 'delete' field to true
  const updatedDiscussion = await discussion.findByIdAndUpdate(
    discussionId,
    { $set: { delete: true } },
    { new: true }
  );

  if (!updatedDiscussion) {
    return {
      message: "Discussion not found",
      statusCode: 404,
      status: "failure",
    };
  }

  return {
    message: "Discussion deleted successfully",
    statusCode: 200,
    status: "success",
    data: updatedDiscussion,
  };
}

/**
 * deleteComment - Delete a comment
 * 
 * @param {Object} payload - contains information of comment
 * @returns  success or failure status
 */
async function deleteComment(payload) {
  const { commentId } = payload;

  // Find the discussion by id and update the 'delete' field to true
  const updatedComment = await comment.findByIdAndUpdate(
    commentId,
    { $set: { delete: true } },
    { new: true }
  );

  if (!updatedComment) {
    return {
      message: "Comment not found",
      statusCode: 404,
      status: "failure",
    };
  }

  return {
    message: "Comment deleted successfully",
    statusCode: 200,
    status: "success",
    data: updatedComment,
  };
}

/**
 * switchOffGuidetour - Set all flags for guide tour to true
 * 
 * @param {Object} user - contains information of user
 * @returns  success or failure status
 */
async function switchOffGuidetour(user) {
  const tourUser = await users.findOne({ _id: user._id });
  if (!tourUser) {
    return {
      message: "User not found",
      statusCode: 404,
      status: "failure",
    };
  }

  // Update the fields to switch off the guide tour
  const updatedUser = await users.findByIdAndUpdate(
    user._id,
    {
      $set: {
        isCompleteCourseListTour: true,
        isCompleteCourseDetailsTour: true,
        isCompleteForumListTour: true,
        isCompleteCourseForumTour: true,
        isCompleteDiscussionTour: true,
      },
    },
    { new: true, useFindAndModify: false }
  );

  return {
    message: "Guide tour switched off successfully",
    statusCode: 200,
    status: "success",
    data: updatedUser,
  };
}

/**
 * switchOnGuidetour - Set all flags for guide tour to false
 * 
 * @param {Object} user - contains information of user
 * @returns  success or failure status
 */
async function switchOnGuidetour(user) {
  const tourUser = await users.findOne({ _id: user._id });
  if (!tourUser) {
    return {
      message: "User not found",
      statusCode: 404,
      status: "failure",
    };
  }

  // Update the fields to switch on the guide tour
  const updatedUser = await users.findByIdAndUpdate(
    user._id,
    {
      $set: {
        isCompleteCourseListTour: false,
        isCompleteCourseDetailsTour: false,
        isCompleteForumListTour: false,
        isCompleteCourseForumTour: false,
        isCompleteDiscussionTour: false,
      },
    },
    { new: true, useFindAndModify: false }
  );

  return {
    message: "Guide tour switched on successfully",
    statusCode: 200,
    status: "success",
    data: updatedUser,
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
  getStudentCourseList,
  forgotPassword,
  resetPassword,
  updateUser,
  createDiscussion,
  createComment,
  getForumDiscussions,
  getDiscussionComments,
  deleteComment,
  deleteDiscussion,
  switchOffGuidetour,
  switchOnGuidetour,
};
