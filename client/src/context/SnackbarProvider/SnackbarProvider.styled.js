/**
 * Import Modules
 */
import { styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

// Styling for Material Design content
export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent": {
      ...theme.typography.body1,
      fontWeight: 500,
      boxShadow: theme.customVariables.boxShadow,
      borderRadius: "8px",
      flexWrap: "nowrap",
    },
    "&.notistack-MuiContent-success": {
      background: theme.palette.success.background,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.success.main}`,
    },
    "&.notistack-MuiContent-error": {
      background: theme.palette.error.background,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.error.main}`,
    },
  })
);
