import { Box, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const StyledContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "626px",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.border}`,
  borderRadius: "8px",
  boxShadow: 24,
  padding: "24px",

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

export const StyledClosedIcon = styled(CloseIcon)({
  cursor: "pointer",
  marginLeft: "auto",
  width: "32px",
  height: "32px",
});
