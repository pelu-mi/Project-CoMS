/**
 * Import Modules
 */
import { Box, Typography, styled } from "@mui/material";

// Styling for Content
export const StyledContent = styled(Box)(({ theme }) => ({
  padding: "8px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.divider}`,
}));

// Styling for Typography
export const StyledTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  wordBreak: "break-word",
});
