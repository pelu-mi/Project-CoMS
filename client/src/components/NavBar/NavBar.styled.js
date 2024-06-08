import { AppBar, Button, styled } from "@mui/material";
import { FullLogoIcon } from "components/Icon";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  background: "white",
}));

export const StyledNavLogo = styled(FullLogoIcon)({
  marginRight: 24,
  cursor: "pointer",
  height: "42px",
  width: "auto",
});

export const StyledNavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active = false }) => ({
  height: "64px",
  borderRadius: 0,
  fontWeight: active ? 600 : 500,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  borderBottom: "3px solid",
  borderBottomColor: active ? theme.palette.primary.main : "transparent",
  paddingBottom: "3px",
}));
