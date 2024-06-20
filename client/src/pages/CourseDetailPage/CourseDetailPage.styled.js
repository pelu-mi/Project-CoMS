/**
 * Import Modules
 */
import { Box, CardMedia, Grid, Typography, styled } from "@mui/material";

// Styling for Banner
export const StyledBanner = styled(CardMedia)(({ theme, image }) => ({
  margin: "16px 0",
  width: "100%",
  height: "200px",
  borderRadius: 8,
  background: !image ? theme.palette.primary.background : "none",
}));

// Styling for Title Container
export const StyledTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

// Styling for Typography Wrapper
export const StyledTypographyWrapper = styled(Box)({
  flexBasis: "100%",
  flexGrow: "100",
});

// Styling for Typography
export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  marginBottom: "16px",
  wordBreak: "break-word",
});

// Styling for Title Action container
export const StyledTitleActionContainer = styled(Grid)({
  flexWrap: "wrap-reverse",
  flexGrow: "1",
  height: "100%",
  justifyContent: "flex-end",
});

// Styling for Empty Layout
export const StyledEmptyLayout = styled(Box)({
  margin: "auto 0",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});

// Styling for Content Container
export const StyledContentContainer = styled(Box)({
  minHeight: "40vh",
  display: "flex",
  flexDirection: "column",
});
