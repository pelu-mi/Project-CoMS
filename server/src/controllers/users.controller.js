/**
 * Import modules
 */
import usersServices from "../services/users.services.js";

/**
 * createAccount - create a new user account
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function createAccount(req, res) {
  try {
    const response = await usersServices.createAccount(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account",
      status: "failure",
    });
  }
}

/**
 * login - Login to existing account
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function login(req, res) {
  try {
    const response = await usersServices.login(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to login",
      status: "failure",
    });
  }
}

/**
 * createCourse - Create a course (restricted to instructors only)
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function createCourse(req, res) {
  try {
    const response = await usersServices.createCourse(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create course",
      status: "failure",
    });
  }
}

/**
 * getInstructorCourseList - Get the list of course created by instructors
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getInstructorCourseLIst(req, res) {
  try {
    const response = await usersServices.getInstructorCourseLIst(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get courses",
      status: "failure",
    });
  }
}

/**
 * getCourseDetails - Get details for a course
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getCourseDetails(req, res) {
  try {
    const response = await usersServices.getCourseDetails(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get courses details",
      status: "failure",
    });
  }
}

/**
 * addCourseContent - Create a new coursecontent object and
 *                    reference it in the course object
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function addCourseContent(req, res) {
  try {
    const response = await usersServices.addCourseContent(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create course content",
      status: "failure",
    });
  }
}

/**
 * addStudents - Register students in a course
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function addStudents(req, res) {
  try {
    const response = await usersServices.addStudents(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to add students",
      status: "failure",
    });
  }
}

/**
 * editCourse - Edit an existing course
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function editCourse(req, res) {
  try {
    const response = await usersServices.editCourse(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to edit course",
      status: "failure",
    });
  }
}

/**
 * editCourseContent - Edit an existing Course content
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function editCourseContent(req, res) {
  try {
    const response = await usersServices.editCourseContent(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to edit course content",
      status: "failure",
    });
  }
}

/**
 * getAllCourseContent - Get all course content related to specific course
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getAllCourseContent(req, res) {
  try {
    const response = await usersServices.getAllCourseContent(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get course content",
      status: "failure",
    });
  }
}

/**
 * getAllUnregisteredStudents - Get all students not registered in a course
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getAllUnregisteredStudents(req, res) {
  try {
    const response = await usersServices.getAllUnregisteredStudents(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get students",
      status: "failure",
    });
  }
}

/**
 * getAllRegisteredStudents - Get all students registered in a course
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getAllRegisteredStudents(req, res) {
  try {
    const response = await usersServices.getAllRegisteredStudents(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get students",
      status: "failure",
    });
  }
}

/**
 * getAllStudents - Get all students on the platform
 *
 * Restricted to instructors only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getAllStudents(req, res) {
  try {
    const response = await usersServices.getAllStudents();
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get students",
      status: "failure",
    });
  }
}

/**
 * getStudentCourseList - Get all courses a student is registered in
 *
 * Restricted to students only
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getStudentCourseList(req, res) {
  try {
    const response = await usersServices.getStudentCourseList(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get students course list",
      status: "failure",
    });
  }
}

/**
 * forgotPassword - Request for OTP code
 *
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function forgotPassword(req, res) {
  try {
    const response = await usersServices.forgotPassword(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to send mail",
      status: "failure",
    });
  }
}

/**
 * resetPassword - Reset user's password
 *
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function resetPassword(req, res) {
  try {
    const response = await usersServices.resetPassword(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to reset password",
      status: "failure",
    });
  }
}

/**
 * updateUser - Update User information
 *
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function updateUser(req, res) {
  try {
    const response = await usersServices.updateUser(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update user",
      status: "failure",
    });
  }
}

/**
 * createDiscussion - Create a new Discussion
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function createDiscussion(req, res) {
  try {
    const response = await usersServices.createDiscussion(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create discussion",
      status: "failure",
    });
  }
}

/**
 * createDiscussion - Create a new comment
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function createComment(req, res) {
  try {
    const response = await usersServices.createComment(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create comment",
      status: "failure",
    });
  }
}

/**
 * getForumDiscussion - Get all Discussions under a course
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getForumDiscussions(req, res) {
  try {
    const response = await usersServices.getForumDiscussions(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get discussions",
      status: "failure",
    });
  }
}

/**
 * getDiscussionComments - Get all comments under a discussion
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function getDiscussionComments(req, res) {
  try {
    const response = await usersServices.getDiscussionComments(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get comments",
      status: "failure",
    });
  }
}

/**
 * deleteDiscussion - Set delete = true for a discussion
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function deleteDiscussion(req, res) {
  try {
    const response = await usersServices.deleteDiscussion(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete discussion",
      status: "failure",
    });
  }
}

/**
 * deleteComment - Set delete = true for a comment
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function deleteComment(req, res) {
  try {
    const response = await usersServices.deleteComment(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete comment",
      status: "failure",
    });
  }
}

/**
 * switchOffGuidetour - set all guide tour flags to true
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function switchOffGuidetour(req, res) {
  try {
    const response = await usersServices.switchOffGuidetour(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to switch off tour",
      status: "failure",
    });
  }
}

/**
 * switchOnGuidetour - set all guide tour flags to false
 *
 * @param {object} req - Request Object
 * @param {object} res - Response Object
 */
async function switchOnGuidetour(req, res) {
  try {
    const response = await usersServices.switchOnGuidetour(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to switch on tour",
      status: "failure",
    });
  }
}

/**
 * Export all fuctions
 */
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
  deleteDiscussion,
  deleteComment,
  switchOffGuidetour,
  switchOnGuidetour,
};
