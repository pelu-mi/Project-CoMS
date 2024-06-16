/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { useMemo } from "react";
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
import { useColorMode } from "context/ColorModeProvider";
import getTheme from "./theme";

/**
 * Theme Provider
 */
export const ThemeProvider = ({ children }) => {
  const { colorMode } = useColorMode();
  const theme = useMemo(() => getTheme(colorMode), [colorMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={css`
          html,
          body,
          #root {
            min-height: 100%;
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

// Specify types of props to be received by ThemeProvider
ThemeProvider.propTypes = {
  children: PropTypes.node,
};
