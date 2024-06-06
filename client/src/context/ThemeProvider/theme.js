import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3851DD",
      background: "#F5F6FF",
    },
    secondary: {
      main: "#313131",
    },
    error: {
      main: "#F26A6A",
    },
    success: {
      main: "#20C11D",
    },
    text: {
      primary: "#313131",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 763,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: ["Inter", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontSize: "16px",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          padding: "12px 20px",
        },
        outlined: {
          padding: "12px 20px",
        },
        outlinedSecondary: ({ theme }) => ({
          borderColor: theme.palette.grey[400],
        }),
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "14px",
          fontWeight: 500,
          color: theme.palette.grey[400],
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "64px",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
