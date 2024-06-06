import { IconButton, ListItemButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export const StyledListItemButton = styled(ListItemButton)(
  ({ theme, active }) => ({
    borderRight: "3px solid",
    borderRightColor: active ? theme.palette.primary.main : "transparent",
    color: active ? theme.palette.primary.main : theme.palette.text,
  })
);
