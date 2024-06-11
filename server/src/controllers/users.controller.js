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
};
