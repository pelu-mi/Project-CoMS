import { Box, Paper, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  position: "relative",
  borderRadius: "8px",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "300px",
  },
}));

export const StyledClosedIcon = styled(CloseIcon)({
  cursor: "pointer",
  marginLeft: "auto",
  position: "absolute",
  top: "20px",
  right: "20px",
});

export const StyledActionContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  marginTop: "20px",
});

export const StyledRightActionContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  marginLeft: "auto",
});
