/**
 * Import Modules
 */
import express from "express";
import userControllers from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.js";

// Define Router object for all /user routes
const router = express.Router();

// POST request to /createaccount
router.post("/createaccount", userControllers.createAccount);

// POST request to /login
router.post("/login", userControllers.login);

// POST request to /createcourse
router.post(
  "/createcourse",
  authMiddleware.authenticate,
  userControllers.createCourse
);

// GET request to /instructorcourselist
router.get(
  "/instructorcourselist",
  authMiddleware.authenticate,
  userControllers.getInstructorCourseLIst
);

// GET request to /coursedetails/:courseId
router.get("/coursedetails/:courseId", userControllers.getCourseDetails);

// POST request to /addcoursecontent
router.post(
  "/addcoursecontent",
  authMiddleware.authenticate,
  userControllers.addCourseContent
);

// POST request to /addstudents
router.post(
  "/addstudents",
  authMiddleware.authenticate,
  userControllers.addStudents
);

// GET request to /allcoursecontent/:courseId
router.get("/allcoursecontent/:courseId", userControllers.getAllCourseContent);

// GET request to /getunregisteredstudents/:courseId
router.get(
  "/getunregisteredstudents/:courseId",
  authMiddleware.authenticate,
  userControllers.getAllUnregisteredStudents
);

// GET request to /registeredstudents/:courseId
router.get(
  "/registeredstudents/:courseId",
  authMiddleware.authenticate,
  userControllers.getAllRegisteredStudents
);

// POST request to /editcourse
router.post(
  "/editcourse",
  authMiddleware.authenticate,
  userControllers.editCourse
);

// POST request to /editcoursecontent
router.post(
  "/editcoursecontent",
  authMiddleware.authenticate,
  userControllers.editCourseContent
);

// GET request to /getallstudents
router.get(
  "/getallstudents",
  authMiddleware.authenticate,
  userControllers.getAllStudents
);

// GET request to /studentcourselist
router.get(
  "/studentcourselist",
  authMiddleware.studentAuthenticate,
  userControllers.getStudentCourseList
);

/**
 * Export router object
 */
export default router;
