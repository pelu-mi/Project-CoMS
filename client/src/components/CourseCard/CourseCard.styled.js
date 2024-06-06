import { Button, Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export const StyledIconWrapper = styled(Button)({
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "4px",
  minWidth: "34px",
  background: "white",
});
