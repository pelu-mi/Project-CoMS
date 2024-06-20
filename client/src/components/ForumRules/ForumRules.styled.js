/**
 * Import Modules
 */
import { Box, styled } from "@mui/material";

// Styling for Rule Container
export const StyledRuleContainer = styled(Box)(({ theme }) => ({
  padding: "24px",
  borderRadius: "8px",
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));
