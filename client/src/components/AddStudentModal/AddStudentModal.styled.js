import {  ListItem, MenuList, styled } from "@mui/material";

export const StyledRegisteredList = styled(MenuList)(({ theme }) => ({
  height: "40vh",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[400]}`,
  overflowY: "scroll",
  padding: "8px",
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  borderRadius: "4px",

  ":hover": { background: theme.palette.primary.background },
}));
