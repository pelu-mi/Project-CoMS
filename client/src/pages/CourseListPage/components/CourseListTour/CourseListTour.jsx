import { useUser } from "context";
import { useState } from "react";
import { STATUS } from "react-joyride";
import { GuidedTour } from "components/GuidedTour";
import { GuidedButton } from "components/GuidedButton";
import { ROLES } from "constants/role";
import { useUpdateUserMutation } from "services/api/user/useUpdateUserMutation";

export const CourseListTour = (props) => {
  const { user, handleSetUser } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const instructorSteps = [
    {
      target: ".create-course-step",
      title: (
        <>
          Welcome{" "}
          <span style={{ textTransform: "capitalize" }}>{user.firstName}</span>!
          👋
          <br /> Let&apos;s create a new course.
        </>
      ),
      content:
        "You can create your courses by clicking the 'Create Course' button and filling out the form over here.",
      disableBeacon: true,
    },
    {
      target: ".course-list-step",
      title: `Finding your created courses!`,
      content: "You can check all your courses after you create one here.",
      disableBeacon: true,
    },
  ];
  const studentSteps = [
    {
      target: ".course-list-step",
      title: (
        <>
          Welcome{" "}
          <span style={{ textTransform: "capitalize" }}>{user.firstName}</span>!
          👋
          <br /> Let&apos;s find your enrolled courses.
        </>
      ),
      content: "You can see all your enrolled courses over here.",
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
            if (!user.isCompleteCourseListTour) {
              await updateUser({
                _id: user._id,
                isCompleteCourseListTour: true,
              });
            }
            setShowTutorial(false);
          }
        }}
        steps={user.role === ROLES.instructor ? instructorSteps : studentSteps}
        run={!user.isCompleteCourseListTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
