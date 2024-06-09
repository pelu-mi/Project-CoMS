import express from "express";
import userControllers from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/createaccount", userControllers.createAccount);

router.post("/login", userControllers.login);

router.post(
  "/createcourse",
  authMiddleware.authenticate,
  userControllers.createCourse
);

router.get(
  "/instructorcourselist",
  authMiddleware.authenticate,
  userControllers.getInstructorCourseLIst
);

router.get("/coursedetails/:courseId", userControllers.getCourseDetails);

router.post(
  "/addcoursecontent",
  authMiddleware.authenticate,
  userControllers.addCourseContent
);

router.post(
  "/addstudents",
  authMiddleware.authenticate,
  userControllers.addStudents
);

router.get("/allcoursecontent/:courseId", userControllers.getAllCourseContent);

router.get(
  "/getunregisteredstudents/:courseId",
  authMiddleware.authenticate,
  userControllers.getAllUnregisteredStudents
);

router.get(
  "/registeredstudents/:courseId",
  authMiddleware.authenticate,
  userControllers.getAllRegisteredStudents
);

router.post(
  "/editcourse",
  authMiddleware.authenticate,
  userControllers.editCourse
);
export default router;
