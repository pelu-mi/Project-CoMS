import { Box, styled } from "@mui/material";

export const StyledCourseContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: `8px`,
  padding: "24px",
  boxShadow: theme.customVariables.boxShadow,
  minHeight: "72vh",
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

export const StyledActionContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  flexGrow: 1,
  flexWrap: "wrap-reverse",
});

export const StyledEmptyLayout = styled(Box)({
  margin: "auto 0",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});
