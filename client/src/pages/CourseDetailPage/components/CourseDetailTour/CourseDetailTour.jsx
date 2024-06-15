import { useUser } from "context";
import { useState } from "react";
import { STATUS } from "react-joyride";
import { GuidedTour } from "components/GuidedTour";
import { GuidedButton } from "components/GuidedButton";
import { ROLES } from "constants/role";

export const CourseDetailTour = (props) => {
  const { user } = useUser();
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
        run={user.isCompleteCourseDetailsTour || showTutorial}
      />

      <GuidedButton onClick={() => setShowTutorial(true)} />
    </>
  );
};
