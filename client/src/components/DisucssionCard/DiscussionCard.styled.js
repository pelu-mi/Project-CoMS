import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { Avatar } from "components/Avatar";

// Styling for card
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.customVariables.boxShadow,
}));

// Styling for Card action area
export const StyledCardActionArea = styled(CardActionArea)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "24px",
  width: "100%",
  padding: "24px",

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
  gap: "8px",
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 500,
  width: "32px",
  height: "32px",
}));

// Styling for Typography
export const StyledTypography = styled(Typography)(({ lineClamp = 3 }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: lineClamp,
  WebkitBoxOrient: "vertical",
  wordBreak: "break-word",
}));
