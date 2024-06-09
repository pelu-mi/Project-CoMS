import usersServices from "../services/users.services.js";

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

async function getCourseDetails(req, res) {
  try {
    const response = await usersServices.getCourseDetails(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get courses] details",
      status: "failure",
    });
  }
}

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


export default {
  createAccount,
  login,
  createCourse,
  getInstructorCourseLIst,
  getCourseDetails,
  addCourseContent,
  addStudents,
  editCourse
};
