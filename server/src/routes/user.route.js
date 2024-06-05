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

export default router;
