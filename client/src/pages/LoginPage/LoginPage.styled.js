import { Box, styled } from "@mui/material";

export const StyledLayout = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
  padding: "24px 0",
});

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  padding: 32,
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
