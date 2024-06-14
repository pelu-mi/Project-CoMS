/**
 * Import Modules
 */
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  styled,
} from "@mui/material";

// Styling for card
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  minHeight: "227px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
  display: "flex",
  flexDirection: "column",
}));

// Styling for card media
export const StyledCardMedia = styled(CardMedia)(({ theme, image }) => ({
  height: 120,
  width: "100%",
  background: !image ? theme.palette.primary.background : "none",
}));

// Styling for Icon wrapper
export const StyledIconWrapper = styled(Button)({
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "4px",
  minWidth: "34px",
  background: "white",
});

// Styling for Card Content
export const StyledCardContent = styled(CardContent)({
  paddingBottom: "26px",
  marginBottom: "auto"
});

// Styling for Typography
export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
});

// Styling for Link text
export const StyledLinkText = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  cursor: "pointer",

  ":hover": {
    textDecoration: "underline",
  },
}));

// Styling for Button
export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px",
  borderRadius: 0,
  borderTop: `1px solid ${theme.palette.grey[300]}`,
}));
