import PropTypes from "prop-types";
import { Avatar as MuiAvatar, useTheme } from "@mui/material";
import { stringAvatar } from "utils/stringAvatar";

export const Avatar = ({ name, sx, ...rest }) => {
  const theme = useTheme();

  return (
    <MuiAvatar
      {...stringAvatar(name, theme.palette.background.default)}
      {...rest}
      sx={{ ...sx, textTransform: "uppercase" }}
    />
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  sx: PropTypes.object,
};
