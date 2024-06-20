/**
 * Import Modules
 */
import { useUser } from "context";
import { useState } from "react";
import { STATUS } from "react-joyride";
import { GuidedTour } from "components/GuidedTour";
import { GuidedButton } from "components/GuidedButton";
import { useUpdateUserMutation } from "services/api/user/useUpdateUserMutation";

/**
 * Discussion Detail Tour
 */
export const DiscussionDetailTour = (props) => {
  const { user, handleSetUser } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const steps = [
    {
      target: ".comment-list-step",
      title: (
        <>
          Hi{" "}
          <span style={{ textTransform: "capitalize" }}>{user.firstName}</span>!
          😃
          <br /> Finding comments.
        </>
      ),
      content: "You can see all comments of the topic discussion here.",
      disableBeacon: true,
    },
    {
      target: ".add-comment-step",
      title: `Adding your comments!`,
      content:
        "You can contribute to the topic discussion by adding your comments over here.",
      disableBeacon: true,
    },
  ];

  const { mutateAsync: updateUser } = useUpdateUserMutation({
    onSuccess: async (data) => {
      handleSetUser(data);
    },
  });

  return (
    <>
      <GuidedTour
        {...props}
        callback={async ({ status }) => {
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Call api to set the completion flag
            if (!user.isCompleteDiscussionTour) {
              await updateUser({
                _id: user._id,
                isCompleteDiscussionTour: true,
              });
            }
            setShowTutorial(false);
          }
        }}
        steps={steps}
        run={!user.isCompleteDiscussionTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
