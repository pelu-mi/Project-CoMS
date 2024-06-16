/**
 * Import Modules
 */
import { Button, styled } from "@mui/material";

// Styling for Button
export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "4px 12px",
  borderRadius: "8px",
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
}));
