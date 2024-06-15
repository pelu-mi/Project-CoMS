import { useUser } from "context";
import { useState } from "react";
import { STATUS } from "react-joyride";
import { GuidedTour } from "components/GuidedTour";
import { GuidedButton } from "components/GuidedButton";
import { ROLES } from "constants/role";

export const CourseListTour = (props) => {
  const { user } = useUser();
  const [showTutorial, setShowTutorial] = useState(false);
  const instructorSteps = [
    {
      target: ".create-course-step",
      title: `Welcome ${user.firstName}!`,
      content: "To create a course, you can click the “Create Course” button.",
      disableBeacon: true,
    },
    {
      target: ".course-list-step",
      title: `Find your courses`,
      content: "You can check your courses over here.",
      disableBeacon: true,
    },
  ];
  const studentSteps = [
    {
      target: ".course-list-step",
      title: `Welcome ${user.firstName}!`,
      content: "You can find your enrolled courses over here.",
      disableBeacon: true,
    },
  ];

  return (
    <>
      <GuidedTour
        {...props}
        callback={({ status }) => {
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Call api to set the completion flag
            setShowTutorial(false);
          }
        }}
        steps={user.role === ROLES.instructor ? instructorSteps : studentSteps}
        run={showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
