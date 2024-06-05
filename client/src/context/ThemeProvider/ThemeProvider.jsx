import PropTypes from "prop-types";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
  css,
} from "@mui/material";
import "@fontsource/inter/300.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import theme from "./theme";

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }

          body {
            font-family: "Inter", Arial, sans-serif;
          }
        `}
      />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
