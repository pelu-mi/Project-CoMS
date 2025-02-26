/**
 * Import Modules
 */
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Avatar } from "components/Avatar";

// Styling for Avatar
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 500,
  width: "32px",
  height: "32px",
}));

// Styling for Typography
export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
  wordBreak: "break-word",
});

// Styling for Comment Container
export const StyledCommentContainer = styled(Box)({
  minHeight: "40vh",
  display: "flex",
  flexDirection: "column",
});

// Styling for Comment Container
export const StyledCommentForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  alignItems: "flex-start",
  padding: "24px",
  margin: "16px 0 24px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  background: theme.palette.background.paper,

  [theme.breakpoints.down("sm")]: {
    padding: "16px",
  },
}));
