import { object, string } from "yup";
import { useForm } from "hooks/useForm";
import { useCreateCourseMutation } from "services/api/course/useCreateCourseMutation";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema = object({
  name: string().required("Course Name is required"),
  description: string(),
});

export const useCreateCoursForm = ({ onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm({ validationSchema });
  const queryClient = useQueryClient();

  const { mutateAsync: createCourse } = useCreateCourseMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      form.reset();
      await queryClient.invalidateQueries("/user/instructorcourselist");
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  return {
    ...form,
    handleSubmit: form.handleSubmit(createCourse),
  };
};
