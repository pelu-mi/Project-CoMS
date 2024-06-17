import { useUser } from "context";
import { useState } from "react";
import { STATUS } from "react-joyride";
import { GuidedTour } from "components/GuidedTour";
import { GuidedButton } from "components/GuidedButton";
import { ROLES } from "constants/role";
import { useUpdateUserMutation } from "services/api/user/useUpdateUserMutation";

export const CourseDetailTour = (props) => {
  const { user, handleSetUser } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const instructorSteps = [
    {
      target: ".manage-student-step",
      title: (
        <>
          Hello {user.firstName}! 😃
          <br /> Let&apos;s see your student list.
        </>
      ),
      content:
        "You can register and unregister your students to the course here.",
      disableBeacon: true,
    },
    {
      target: ".edit-course-step",
      title: `Editing your course info!`,
      content: "You can change your course name and description here.",
      disableBeacon: true,
    },
    {
      target: ".upload-content-step",
      title: `Posting a new contents!`,
      content: "You can upload your contents for your students over here.",
      disableBeacon: true,
    },
    {
      target: ".content-list-step",
      title: `Finding your posted contents!`,
      content: "You can see all your course contents here.",
      disableBeacon: true,
    },
  ];
  const studentSteps = [
    {
      target: ".content-list-step",
      title: (
        <>
          Hello {user.firstName}! 😃
          <br /> Let&apos;s see your course contents.
        </>
      ),
      content:
        "You can find all your course materials that are posted by the instructor here.",
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
            if (!user.isCompleteCourseDetailsTour) {
              await updateUser({
                _id: user._id,
                isCompleteCourseDetailsTour: true,
              });
            }
            setShowTutorial(false);
          }
        }}
        steps={user.role === ROLES.instructor ? instructorSteps : studentSteps}
        run={!user.isCompleteCourseDetailsTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
