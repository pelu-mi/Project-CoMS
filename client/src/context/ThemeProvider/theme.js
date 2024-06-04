import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
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
    fontFamily: "Arial, sans-serif",
  },
});

export default responsiveFontSizes(theme);
