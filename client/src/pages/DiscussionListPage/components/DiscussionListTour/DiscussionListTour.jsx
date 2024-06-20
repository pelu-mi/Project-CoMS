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
 * Discussion List Tour
 */
export const DiscussionListTour = (props) => {
  const { user, handleSetUser } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const steps = [
    {
      target: ".add-discussion-step",
      title: (
        <>
          Hi{" "}
          <span style={{ textTransform: "capitalize" }}>{user.firstName}</span>!
          😃
          <br /> Adding your new discussion.
        </>
      ),
      content:
        "You can add a new topic discussion by clicking the 'Add Discussion' button and filling out your topic here.",
      disableBeacon: true,
    },
    {
      target: ".discussion-list-step",
      title: `Finding your course discussions!`,
      content:
        "You can check all your and other's topic discussions over here.",
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
            if (!user.isCompleteCourseForumTour) {
              await updateUser({
                _id: user._id,
                isCompleteCourseForumTour: true,
              });
            }
            setShowTutorial(false);
          }
        }}
        steps={steps}
        run={!user.isCompleteCourseForumTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
