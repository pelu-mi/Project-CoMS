import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
  styled,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
}));

// export const StyledCardActionArea = styled(CardActionArea)({
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-start",
// });

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

export const StyledCardContent = styled(CardContent)({
  paddingBottom: "26px",
});

export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
});

export const StyledLinkText = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,

  ":hover": {
    textDecoration: "underline",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "12px",
  borderRadius: 0,
  borderTop: `1px solid ${theme.palette.grey[300]}`,
}));
