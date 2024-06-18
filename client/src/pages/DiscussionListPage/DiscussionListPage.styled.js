import { Box, styled } from "@mui/material";

export const StyledRuleContainer = styled(Box)(({ theme }) => ({
  padding: "24px",
  borderRadius: "8px",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,

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

export const StyledDiscussionContainer = styled(Box)({
  minHeight: "40vh",
  display: "flex",
  flexDirection: "column",
});

// Styling for Empty Layout
export const StyledEmptyLayout = styled(Box)({
  margin: "auto 0",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});
