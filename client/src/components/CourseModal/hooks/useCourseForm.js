/**
 * Import Modules
 */
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useCreateCourseMutation } from "services/api/course/useCreateCourseMutation";
import { useEditCourseMutation } from "services/api/course/useEditCourseMutation";
import {
  GET_INSTRUCTOR_COURSES_API_KEY,
  GET_STUDENT_COURSES_API_KEY,
  GET_COURSE_DETAILS_API_KEY,
} from "services/constants";
import { object, string } from "yup";

// Validation to use for Creating Course
const validationSchema = object({
  name: string().required("Course Name is required"),
  description: string(),
});

/**
 * useCourseForm - Custom hook to manage Course forms
 */
export const useCourseForm = ({ defaultValues, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm({
    validationSchema,
    defaultValues: defaultValues || {
      courseId: null,
      name: "",
      descripton: "",
    },
  });

  // Handle Success and error for Create Course
  const { mutateAsync: createCourse } = useCreateCourseMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      form.reset();
      await queryClient.invalidateQueries(GET_INSTRUCTOR_COURSES_API_KEY);
      await queryClient.invalidateQueries(GET_STUDENT_COURSES_API_KEY);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  // Handle Success and error for Edit Course
  const { mutateAsync: editCourse } = useEditCourseMutation({
    onSuccess: async (data, payload) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      await queryClient.invalidateQueries(GET_INSTRUCTOR_COURSES_API_KEY);
      await queryClient.invalidateQueries(GET_STUDENT_COURSES_API_KEY);
      await queryClient.invalidateQueries(
        `${GET_COURSE_DETAILS_API_KEY}/${payload.courseId}`
      );
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ courseId, name, description }) => {
    const payload = {
      name,
      description,
    };

    if (courseId) {
      // Call edit course endpoint
      await editCourse({ courseId, name, description });
    } else {
      // Call create course endpoint
      await createCourse(payload);
    }
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};
