/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { StyledFab, StyledQuestionMarkIcon } from "./GuidedButton.styled";

/**
 * Guided Button
 */
export const GuidedButton = ({ onClick }) => {
  return (
    <StyledFab variant="extended" color="primary" size="small" {...{ onClick }}>
      <StyledQuestionMarkIcon />
      <Typography variant="body1" fontWeight={500}>
        Guide
      </Typography>
    </StyledFab>
  );
};

// Specify types of props to be received by the GuidedButton
GuidedButton.propTypes = {
  onClick: PropTypes.func,
};
