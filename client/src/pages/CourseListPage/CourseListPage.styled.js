import { Box, styled } from "@mui/material";

export const StyledCourseContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: `8px`,
  padding: "24px",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",

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
