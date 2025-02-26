/**
 * Import Modules
 */
import { styled } from "@mui/material";
import { LogoIcon } from "components/Icon";

// Styling for <div>
export const StyledLayout = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
  padding: "24px 0",
});

// Styling for <form>
export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  padding: 32,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  boxShadow: theme.customVariables.boxShadow,
  background: theme.palette.background.paper,

  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
  },
}));

// Styling for Logo
export const StyledLogo = styled(LogoIcon)(({ theme }) => ({
  width: 100,
  height: 100,
  rect: {
    fill: theme.palette.primary.main,
  },
  path: {
    fill: theme.palette.background.paper,
  },
}));
