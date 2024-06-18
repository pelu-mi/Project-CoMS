/**
 * Import Modules
 */
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

import { object, string } from "yup";

// Validation to use for Creating Course
const validationSchema = object({
  title: string().required("Topic is required"),
});

export const useDiscussionForm = ({ onClose }) => {
  const { courseId } = useParams();
  //   const { enqueueSnackbar } = useSnackbar();
  //   const queryClient = useQueryClient();

  const form = useForm({
    validationSchema,
  });

  // Handle Success and error for Create Disccussions
  //   const { mutateAsync: createCourse } = useCreateCourseMutation({
  //     onSuccess: async (data) => {
  //       enqueueSnackbar(data.message, { variant: "success" });
  //       onClose();
  //       form.reset();
  //       //   await queryClient.invalidateQueries(GET_INSTRUCTOR_COURSES_API_KEY);
  //     },
  //     onError: (error) => {
  //       enqueueSnackbar(error.message, { variant: "error" });
  //     },
  //   });

  const onSubmit = async ({ title }) => {
    const payload = {
      course: courseId,
      title,
    };
    console.log("payload", payload);
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};
