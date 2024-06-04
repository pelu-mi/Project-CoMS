import PropTypes from "prop-types";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import theme from "./theme";

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
