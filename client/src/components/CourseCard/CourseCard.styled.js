/**
 * Import Modules
 */
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

// Styling for Card
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  minHeight: "227px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

// Styling for Card action area
export const StyledCardActionArea = styled(CardActionArea)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

// Styling for card media
export const StyledCardMedia = styled(CardMedia)(({ theme, image }) => ({
  height: 120,
  width: "100%",
  background: !image ? theme.palette.primary.background : "none",
}));

// Styling for Icon Wrapper
export const StyledIconWrapper = styled(Button)({
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "4px",
  minWidth: "34px",
  background: "white",

  ":hover": {
    background: "rgba(255, 255, 255,0.8)",
  },
});

// Styling for Typography
export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
});
