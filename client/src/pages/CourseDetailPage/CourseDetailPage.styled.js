import { Box, CardMedia, Typography, styled } from "@mui/material";

export const StyledBanner = styled(CardMedia)(({ theme, image }) => ({
  margin: "16px 0",
  width: "100%",
  height: "200px",
  borderRadius: 8,
  background: !image ? theme.palette.primary.background : "none",
}));

export const StyledTitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

export const StyledTypographyWrapper = styled(Box)({
  flexBasis: "60%",
  flexGrow: "100",
});

export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  marginBottom: "16px",
  wordBreak: "break-word",
});

export const StyledTitleActionContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap-reverse",
  flexGrow: "1",
  height: "100%",
  gap: "16px",
});

export const StyledEmptyLayout = styled(Box)({
  margin: "auto 0",
  alignSelf: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});

export const StyledContentContainer = styled(Box)({
  minHeight: "40vh",
  display: "flex",
  flexDirection: "column",
});
