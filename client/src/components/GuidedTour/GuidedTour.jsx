import ReactJoyride from "react-joyride";
import { TooltipGuide } from "./units/TooltipGuide";

export const GuidedTour = (props) => {
  return (
    <ReactJoyride
      {...props}
      showProgress
      spotlightClicks
      continuous
      disableOverlayClose
      locale={{ last: "Done" }}
      styles={{
        options: {
          zIndex: 1100,
        },
      }}
      tooltipComponent={TooltipGuide}
    />
  );
};
