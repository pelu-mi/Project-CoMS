import { useMemo } from "react";
import { useUser } from "context";
import { useSnackbar } from "notistack";
import { useTurnOnGuidesMutation } from "services/api/guidedTour/useTurnOnGuidesMutation";
import { useTurnOffGuidesMutation } from "services/api/guidedTour/useTurnOffGuidesMutation";

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

  const mutationOptions = (showSuccessMessage = false) => ({
    onSuccess: async (data) => {
      if (showSuccessMessage) {
        enqueueSnackbar(data.message, { variant: "success" });
      }
      handleSetUser(data);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const { mutateAsync: turnOnGuides } = useTurnOnGuidesMutation(
    mutationOptions()
  );

  const { mutateAsync: turnOffGuides } = useTurnOffGuidesMutation(
    mutationOptions(true)
  );

  const handleToggleGuides = async () => {
    if (isActiveGuides) {
      await turnOffGuides();
    } else {
      await turnOnGuides();
    }
  };
  return { isActiveGuides, handleToggleGuides };
};
