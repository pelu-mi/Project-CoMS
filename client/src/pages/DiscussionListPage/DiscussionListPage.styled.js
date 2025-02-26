/**
 * Import Modules
 */
import { Box, styled } from "@mui/material";

// Styling for Action Container
export const StyledActionContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  flexGrow: 1,
  flexWrap: "wrap-reverse",
});

// Styling for Discussion Container
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
  justifyContent: "center",
  gap: "16px",
  paddingBottom: "16px",
});
