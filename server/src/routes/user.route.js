/**
 * Import Modules
 */
import express from "express";
import userControllers from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.js";
import auth from "../middlewares/auth.js";

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

// POST request to /forgotpassword
router.post("/forgotpassword", userControllers.forgotPassword);

// POST request to /resetpassword
router.post("/resetpassword", userControllers.resetPassword);

// POST request to /updateuser
router.post("/updateuser", userControllers.updateUser);

// POST request to /courses/forum/creatediscussion
router.post(
  "/courses/forum/creatediscussion",
  authMiddleware.authenticate,
  userControllers.createDiscussion
);

// POST request to /createcomment
router.post(
  "/courses/forum/createcomment",
  authMiddleware.authenticate,
  userControllers.createComment
);

// GET request to /courses/forum/discussions/:courseId
router.get(
  "/courses/forum/discussions/:courseId",
  userControllers.getForumDiscussions
);

// GET request to /courses/forum/discussions/comments/:discussionId
router.get(
  "/courses/forum/discussions/comments/:discussionId",
  userControllers.getDiscussionComments
);

// POST request to /courses/forum/deletecomment
router.post("/courses/forum/deletecomment", userControllers.deleteComment);

// POST request to /courses/forum/deletediscussion
router.post(
  "/courses/forum/deletediscussion",
  userControllers.deleteDiscussion
);

// POST request to /offtour
router.post(
  "/offtour",
  authMiddleware.authenticate,
  userControllers.switchOffGuidetour
);

// POST request to /ontour
router.post(
  "/ontour",
  authMiddleware.authenticate,
  userControllers.switchOnGuidetour
);
/**
 * Export router object
 */
export default router;
