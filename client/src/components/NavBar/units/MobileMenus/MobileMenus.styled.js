/**
 * Import Modules
 */
import { IconButton, ListItemButton, styled } from "@mui/material";

// Styling for icon buttons
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px",
  border: `1px solid ${theme.palette.divider}`,
}));

// Styling for List item buttons
export const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active = false }) => ({
  borderRight: "3px solid",
  borderRightColor: active ? theme.palette.primary.main : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.text,
}));
