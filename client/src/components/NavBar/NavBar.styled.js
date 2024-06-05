import { AppBar, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: "64px",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  background: "white",
}));
