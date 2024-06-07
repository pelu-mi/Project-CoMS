import { styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent": {
      ...theme.typography.body1,
      fontWeight: 500,
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
      borderRadius: "8px",
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
