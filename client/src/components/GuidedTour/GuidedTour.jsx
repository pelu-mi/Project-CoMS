import ReactJoyride from "react-joyride";
import { TooltipGuide } from "./units/TooltipGuide";
import { useTheme } from "@emotion/react";

export const GuidedTour = (props) => {
  const theme = useTheme();

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
          arrowColor: theme.palette.background.arrow,
          zIndex: 1100,
        },
      }}
      tooltipComponent={TooltipGuide}
    />
  );
};
