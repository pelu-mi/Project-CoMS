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
      title: (
        <>
          Welcome {user.firstName}! 👋
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
          Welcome {user.firstName}! 👋
          <br /> Let&apos;s find your enrolled courses.
        </>
      ),
      content: "You can see all your enrolled courses over here.",
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
