import { Box, Button, Card, Typography, styled } from "@mui/material";
import { Avatar } from "components/Avatar";

// Styling for card
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  gap: "24px",

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));

// Styling for Icon wrapper
export const StyledIconWrapper = styled(Button)({
  padding: "4px",
  minWidth: "34px",
  height: "fit-content",
});

export const StyledAuthorContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: 500,
  width: "44px",
  height: "44px",
}));

// Styling for Typography
export const StyledTypography = styled(Typography)(({ lineClamp = 1 }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: lineClamp,
  WebkitBoxOrient: "vertical",
  wordBreak: "break-word",
  fontWeight: 500,
}));
