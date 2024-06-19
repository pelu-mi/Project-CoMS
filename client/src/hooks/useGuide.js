import { useMemo } from "react";
import { useUser } from "context";
import { useUpdateUserMutation } from "services/api/user/useUpdateUserMutation";
import { useSnackbar } from "notistack";

export const useGuide = () => {
  const { user, handleSetUser } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const isActiveGuides = useMemo(() => {
    return (
      !user.isCompleteCourseListTour ||
      !user.isCompleteCourseDetailsTour ||
      !user.isCompleteForumListTour ||
      !user.isCompleteCourseForumTour ||
      !user.isCompleteDiscussionTour
    );
  }, [user]);

  const { mutateAsync: updateUser } = useUpdateUserMutation({
    onSuccess: async (data) => {
      if (isActiveGuides) {
        enqueueSnackbar("Turned off guides successfully", {
          variant: "success",
        });
      }

      handleSetUser(data);
    },
    onError: () => {
      const message = isActiveGuides
        ? "Turned off guides failed"
        : "Turned on guides failed";

      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const handleToggleGuides = async () => {
    const payload = {
      _id: user._id,
      isCompleteCourseListTour: isActiveGuides,
      isCompleteCourseDetailsTour: isActiveGuides,
      isCompleteForumListTour: isActiveGuides,
      isCompleteCourseForumTour: isActiveGuides,
      isCompleteDiscussionTour: isActiveGuides,
    };

    await updateUser(payload);
  };
  return { isActiveGuides, handleToggleGuides };
};
