import { Box, Modal as MuiModal, Typography } from "@mui/material";

import { StyledClosedIcon, StyledContent } from "./Modal.styled";
import PropTypes from "prop-types";

export const Modal = ({
  children,
  title,
  onClose,
  hideCloseIcon = false,
  ...res
}) => {
  return (
    <MuiModal
      {...{ ...res, onClose }}
      sx={{
        marginX: "16px",
      }}
    >
      <StyledContent>
        {(title || !hideCloseIcon) && (
          <Box display="flex" alignItems="center">
            {title && <Typography variant="h5">Create Course</Typography>}
            {!hideCloseIcon && <StyledClosedIcon onClick={onClose} />}
          </Box>
        )}
        {children}
      </StyledContent>
    </MuiModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
  hideCloseIcon: PropTypes.bool,
};
