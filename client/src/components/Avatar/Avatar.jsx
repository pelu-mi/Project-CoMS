/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Avatar as MuiAvatar, useTheme } from "@mui/material";
import { stringAvatar } from "utils/stringAvatar";

/**
 * Avatar
 */
export const Avatar = ({ name, sx, ...rest }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const { sx: sxBgColor, children } = stringAvatar(
    name,
    theme.palette.background.default,
    isDarkMode
  );

  return (
    <MuiAvatar
      {...{ ...rest, children }}
      sx={{ ...sx, ...sxBgColor, textTransform: "uppercase" }}
    />
  );
};

// Specify types of props to be received by the Avatar
Avatar.propTypes = {
  name: PropTypes.string,
  sx: PropTypes.object,
};
