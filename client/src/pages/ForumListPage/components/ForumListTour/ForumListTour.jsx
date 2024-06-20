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
 * Forum List Tour
 */
export const ForumListTour = (props) => {
  const { user, handleSetUser } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const steps = [
    {
      target: ".forum-list-step",
      title: (
        <>
          Hi{" "}
          <span style={{ textTransform: "capitalize" }}>{user.firstName}</span>!
          😃
          <br /> Finding all course forums.
        </>
      ),
      content:
        "You can see all forums and have access directly to the forum over here.",
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
            if (!user.isCompleteForumListTour) {
              await updateUser({
                _id: user._id,
                isCompleteForumListTour: true,
              });
            }
            setShowTutorial(false);
          }
        }}
        steps={steps}
        run={!user.isCompleteForumListTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
