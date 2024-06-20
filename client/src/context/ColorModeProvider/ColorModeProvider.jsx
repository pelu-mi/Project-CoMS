/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";

export const COLOR_MODE_LOCAL_STORAGE_KEY = "colorMode";

const ColorModeContext = createContext();

/**
 * Color mode provider
 */
export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState(() => {
    const storedColorMode = localStorage.getItem(COLOR_MODE_LOCAL_STORAGE_KEY);

    if (!storedColorMode) {
      const prefersColorMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      localStorage.setItem(COLOR_MODE_LOCAL_STORAGE_KEY, prefersColorMode);
      return prefersColorMode;
    }

    return storedColorMode;
  });

  const contexValue = useMemo(
    () => ({
      colorMode,
      toggleColorMode: () => {
        setColorMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem(COLOR_MODE_LOCAL_STORAGE_KEY, newMode);
          return newMode;
        });
      },
    }),
    [colorMode, setColorMode]
  );

  return (
    <ColorModeContext.Provider value={contexValue}>
      {children}
    </ColorModeContext.Provider>
  );
};

/**
 * Export Function
 */
export const useColorMode = () => useContext(ColorModeContext);

ColorModeProvider.propTypes = {
  children: PropTypes.node,
};
