import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { StyledFab, StyledQuestionMarkIcon } from "./GuidedButton.styled";

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

GuidedButton.propTypes = {
  onClick: PropTypes.func,
};
