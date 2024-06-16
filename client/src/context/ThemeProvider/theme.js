/**
 * Import Modules
 */
import { createTheme, responsiveFontSizes } from "@mui/material";

/**
 * Theme 1
 */

const lightPalette = {
  primary: {
    main: "#3851DD",
    background: "#F5F6FF",
    icon: "#C3CBF5",
  },
  secondary: {
    main: "#313131",
  },
  error: {
    main: "#E95252",
    background: "#FEF0F0",
  },
  success: {
    main: "#20C11D",
    background: "#F4FCF4",
  },
  text: {
    primary: "#313131",
  },
  background: {
    arrow: "#FFF",
  },
};

const darkPalette = {
  primary: {
    main: "#3851DD",
    background: "#5B62A8",
    icon: "#6371B8",
  },
  secondary: {
    main: "#EEEEEE",
  },
  error: {
    main: "#E95252",
    background: "#231414",
  },
  success: {
    main: "#20C11D",
    background: "#0F1F0F",
  },
  text: {
    primary: "#EEEEEE",
  },
  background: {
    paper: "#222222",
    default: "#1C1C1C",
    arrow: "#292929",
  },
};

const getTheme = (mode) => {
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? lightPalette : darkPalette),
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
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&>.Mui-disabled": {
              background:
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[900],
            },
          }),
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            padding: "12px 20px",
          },
          outlined: {
            padding: "12px 20px",
          },
          outlinedSecondary: ({ theme }) => ({
            borderColor:
              theme.palette.mode === "light"
                ? theme.palette.grey[400]
                : theme.palette.grey[700],
          }),
          sizeSmall: {
            padding: "8px 16px",
            fontSize: "16px",
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
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: "64px",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: ({ theme }) => ({
            background: theme.palette.primary.main,
          }),
        },
      },
    },
    customVariables: {
      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
    },
  });

  return responsiveFontSizes(theme);
};

export default getTheme;
