import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3851DD",
    },
    secondary: {
      main: "#3851DD",
    },
    error: {
      main: "#F26A6A",
    },
    success: {
      main: "#20C11D",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
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
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontSize: "16px",
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
  },
});

export default responsiveFontSizes(theme);
