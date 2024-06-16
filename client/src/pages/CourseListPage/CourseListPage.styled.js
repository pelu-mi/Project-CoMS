/**
 * Import Modules
 */
import { Box, styled } from "@mui/material";

// Styling for Course Container
export const StyledCourseContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: `8px`,
  padding: "24px",
  boxShadow: theme.customVariables.boxShadow,
  minHeight: "72vh",
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

// Styling for Action Container
export const StyledActionContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  flexGrow: 1,
  flexWrap: "wrap-reverse",
});

// Styling for Empty Layout
export const StyledEmptyLayout = styled(Box)({
  margin: "auto",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});
