import { AppBar, Box, Button, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  background: "white",
}));

export const StyledNavLogo = styled(Box)({
  marginRight: 24,
  cursor: "pointer",
});

export const StyledNavButton = styled(Button)(({ theme, active = false }) => ({
  height: "64px",
  borderRadius: 0,
  fontWeight: active ? 600 : 500,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  borderBottom: "3px solid",
  borderBottomColor: active ? theme.palette.primary.main : "transparent",
  paddingBottom: "3px",
}));
