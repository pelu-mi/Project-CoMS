import PropTypes from "prop-types";
import {
  SnackbarProvider as BaseSnackbarProvider,
  closeSnackbar,
} from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { IconButton } from "@mui/material";
import { StyledMaterialDesignContent } from "./SnackbarProvider.styled";
import { useRef } from "react";

export const SnackbarProvider = ({ children }) => {
  const ref = useRef();
  return (
    <BaseSnackbarProvider
      ref={ref}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      autoHideDuration={3000}
      action={(snackbarId) => (
        <IconButton onClick={() => closeSnackbar(snackbarId)}>
          <CloseIcon />
        </IconButton>
      )}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
      iconVariant={{
        success: <CheckCircleIcon color="success" sx={{ mr: "14px" }} />,
        error: <ErrorIcon color="error" sx={{ mr: "14px" }} />,
      }}
    >
      {children}
    </BaseSnackbarProvider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node,
};
