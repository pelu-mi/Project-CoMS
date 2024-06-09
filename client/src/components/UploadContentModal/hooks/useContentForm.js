import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "hooks/useForm";
import { useSnackbar } from "notistack";
import { useAddCourseContentMutation } from "services/api/courseDetail/useAddCourseContentMutation";
import { GET_COURSE_CONTENT_API_KEY } from "services/constants";
import { object, string } from "yup";

const validationSchema = object({
  title: string().required("Content title is required"),
  description: string().required("Content Description is required"),
  link: string().required("Link is required"),
});

export const useContentForm = ({ courseId, defaultValues, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const form = useForm({
    validationSchema,
    defaultValues: defaultValues || {
      course: courseId,
      title: "",
      descripton: "",
      link: "",
    },
  });

  const { mutateAsync: addContent } = useAddCourseContentMutation({
    onSuccess: async (data, { course: courseId }) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      form.reset();
      await queryClient.invalidateQueries(
        `${GET_COURSE_CONTENT_API_KEY}/${courseId}`
      );
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const onSubmit = async ({ course: courseId, title, description, link }) => {
    const payload = {
      course: courseId,
      title,
      description,
      link,
    };

    if (defaultValues) {
      // Call edit course endpoint
    } else {
      // Call create course endpoint
      await addContent(payload);
    }
  };

  return { ...form, handleSubmit: form.handleSubmit(onSubmit) };
};
