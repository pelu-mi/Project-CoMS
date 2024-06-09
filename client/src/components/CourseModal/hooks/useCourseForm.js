import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useCreateCourseMutation } from "services/api/course/useCreateCourseMutation";
import { object, string } from "yup";

const validationSchema = object({
  name: string().required("Course Name is required"),
  description: string(),
});

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

  const onSubmit = async ({ courseId, name, description }) => {
    const payload = {
      name,
      description,
    };

    if (courseId) {
      // Call edit course with courseId
    } else {
      await createCourse(payload);
    }
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};
