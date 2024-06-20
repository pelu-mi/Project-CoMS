/**
 * Import Modules
 */
import { Alert, ListItem, MenuList, styled } from "@mui/material";

// Styling for list of registered students
export const StyledRegisteredList = styled(MenuList)(({ theme }) => ({
  height: "40vh",
  borderRadius: "4px",
  border: `1px solid ${
    theme.palette.mode === "light"
      ? theme.palette.grey[400]
      : theme.palette.grey[700]
  }`,
  overflowY: "scroll",
  padding: "8px",
}));

// Styling for list items
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  borderRadius: "4px",

  ":hover": { background: theme.palette.action.hover },
}));

// Styling for alert info
export const StyledAlert = styled(Alert)({
  marginTop: "8px",
});
