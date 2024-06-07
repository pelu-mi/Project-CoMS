import { Button, Card, CardMedia, Typography, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  minHeight: "227px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export const StyledCardMedia = styled(CardMedia)(({ theme, image }) => ({
  height: 120,
  width: "100%",
  background: !image ? theme.palette.primary.background : "none",
}));

export const StyledIconWrapper = styled(Button)({
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "4px",
  minWidth: "34px",
  background: "white",
});

export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
});
