/**
 * Import Modules
 */
import { Box, Modal as MuiModal, Typography } from "@mui/material";

import { StyledClosedIcon, StyledContent } from "./Modal.styled";
import PropTypes from "prop-types";

/**
 * Modal definition
 */
export const Modal = ({
  children,
  title,
  onClose,
  hideCloseIcon = false,
  modalStyles,
  contentStyles,
  ...rest
}) => {
  return (
    <MuiModal
      {...{ ...rest, onClose }}
      sx={{
        marginX: "16px",
        ...modalStyles,
      }}
    >
      <StyledContent sx={contentStyles}>
        {(title || !hideCloseIcon) && (
          <Box display="flex" alignItems="center">
            {title && <Typography variant="h5">{title}</Typography>}
            {!hideCloseIcon && <StyledClosedIcon onClick={onClose} />}
          </Box>
        )}
        {children}
      </StyledContent>
    </MuiModal>
  );
};

// Specify types of props to be received by the Modal
Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
  modalStyles: PropTypes.object,
  contentStyles: PropTypes.object,
  hideCloseIcon: PropTypes.bool,
};
