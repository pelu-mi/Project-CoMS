import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { createCourseApi } from "services/api/course/createCourseApi";
import { useSnackbar } from "notistack";

const validationSchema = object({
  name: string().required("Course Name is required"),
  description: string(),
});

export const useCreateCoursForm = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ validationSchema });

  const onSubmit = async (formValues) => {
    try {
      // Create Course
      const response = await createCourseApi(formValues);
      console.log("create course response", response);
      // Call success snackbar
      enqueueSnackbar(response.message, { variant: "success" });

      onClose();
    } catch (error) {
      // Call error snackbar
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
