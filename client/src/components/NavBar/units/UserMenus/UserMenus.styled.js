import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "4px 12px",
  borderRadius: "8px",
  borderColor: theme.palette.grey[300],
  backgroundColor: theme.palette.primary.background,
  color: theme.palette.text.primary,
}));
