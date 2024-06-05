import { AppBar, Box, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  background: "white",
}));

export const StyledNavLogo = styled(Box)({
  marginRight: 24,
});
