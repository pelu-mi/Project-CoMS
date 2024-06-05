import { Box, styled } from "@mui/material";

export const StyledLoginLayout = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

export const StyledLoginForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 32,
  padding: 40,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 8,
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",

  [theme.breakpoints.down("md")]: {
    padding: "40px 24px",
  },
}));

export const StyledLogo = styled(Box)({
  width: 100,
});
