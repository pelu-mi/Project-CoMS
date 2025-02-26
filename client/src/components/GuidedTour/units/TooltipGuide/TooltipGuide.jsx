/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DoneIcon from "@mui/icons-material/Done";
import {
  StyledActionContainer,
  StyledClosedIcon,
  StyledPaper,
  StyledRightActionContainer,
} from "./TooltipGuide.styled";

/**
 * Tool tip Guide
 */
export const TooltipGuide = ({
  continuous,
  index,
  isLastStep,
  size,
  step,
  backProps,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}) => {
  return (
    <StyledPaper {...tooltipProps}>
      {step.showProgress && (
        <Typography
          variant="caption"
          textTransform="uppercase"
          color="text.secondary"
        >
          Step {index + 1} of {size}
        </Typography>
      )}

      {!step.hideCloseButton && (
        <StyledClosedIcon
          sx={!step.showProgress && { top: "24px" }}
          {...skipProps}
        />
      )}

      {step.title && (
        <Typography
          variant="h6"
          sx={!step.showProgress && { paddingRight: "32px" }}
        >
          {step.title}
        </Typography>
      )}

      <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
        {step.content}
      </Typography>

      <StyledActionContainer>
        {step.showSkipButton && (
          <Button variant="text" color="secondary" {...skipProps}>
            {step.locale.skip}
          </Button>
        )}

        <StyledRightActionContainer>
          {index > 0 && (
            <Button variant="text" size="small" {...backProps}>
              {step.locale.back}
            </Button>
          )}
          {continuous && (
            <Button
              size="small"
              {...primaryProps}
              endIcon={isLastStep ? <DoneIcon /> : <ArrowForwardIcon />}
            >
              {isLastStep ? step.locale.last : step.locale.next}
            </Button>
          )}
          {!continuous && (
            <Button size="small" {...closeProps}>
              {step.locale.close}
            </Button>
          )}
        </StyledRightActionContainer>
      </StyledActionContainer>
    </StyledPaper>
  );
};

// Specify types of props to be received by the TooltipGuide
TooltipGuide.propTypes = {
  continuous: PropTypes.bool,
  showProgress: PropTypes.bool,
  index: PropTypes.number,
  isLastStep: PropTypes.bool,
  size: PropTypes.number,
  step: PropTypes.object,
  backProps: PropTypes.object,
  closeProps: PropTypes.object,
  primaryProps: PropTypes.object,
  skipProps: PropTypes.object,
  tooltipProps: PropTypes.object,
};
