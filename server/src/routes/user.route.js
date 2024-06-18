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
  authMiddleware.instructorAuthenticate,
  userControllers.createCourse
);

// GET request to /instructorcourselist
router.get(
  "/instructorcourselist",
  authMiddleware.instructorAuthenticate,
  userControllers.getInstructorCourseLIst
);

// GET request to /coursedetails/:courseId
router.get("/coursedetails/:courseId", userControllers.getCourseDetails);

// POST request to /addcoursecontent
router.post(
  "/addcoursecontent",
  authMiddleware.instructorAuthenticate,
  userControllers.addCourseContent
);

// POST request to /addstudents
router.post(
  "/addstudents",
  authMiddleware.instructorAuthenticate,
  userControllers.addStudents
);

// GET request to /allcoursecontent/:courseId
router.get("/allcoursecontent/:courseId", userControllers.getAllCourseContent);

// GET request to /getunregisteredstudents/:courseId
router.get(
  "/getunregisteredstudents/:courseId",
  authMiddleware.instructorAuthenticate,
  userControllers.getAllUnregisteredStudents
);

// GET request to /registeredstudents/:courseId
router.get(
  "/registeredstudents/:courseId",
  authMiddleware.instructorAuthenticate,
  userControllers.getAllRegisteredStudents
);

// POST request to /editcourse
router.post(
  "/editcourse",
  authMiddleware.instructorAuthenticate,
  userControllers.editCourse
);

// POST request to /editcoursecontent
router.post(
  "/editcoursecontent",
  authMiddleware.instructorAuthenticate,
  userControllers.editCourseContent
);

// GET request to /getallstudents
router.get(
  "/getallstudents",
  authMiddleware.instructorAuthenticate,
  userControllers.getAllStudents
);

// GET request to /studentcourselist
router.get(
  "/studentcourselist",
  authMiddleware.studentAuthenticate,
  userControllers.getStudentCourseList
);

router.post("/forgotpassword", userControllers.forgotPassword);

router.post("/resetpassword", userControllers.resetPassword);

router.post("/updateuser", userControllers.updateUser);

router.post(
  "/courses/forum/creatediscussion",
  authMiddleware.authenticate,
  userControllers.createDiscussion
);

router.post(
  "/courses/forum/createcomment",
  authMiddleware.authenticate,
  userControllers.createComment
);

router.get(
  "/courses/forum/discussions/:courseId",
  userControllers.getForumDiscussions
);

router.get(
  "/courses/forum/discussions/comments/:discussionId",
  userControllers.getDiscussionComments
);

router.post("/courses/forum/deletecomment", userControllers.deleteComment);

router.post(
  "/courses/forum/deletediscussion",
  userControllers.deleteDiscussion
);

/**
 * Export router object
 */
export default router;
