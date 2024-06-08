import { Box, CircularProgress, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";

export const Loader = ({ type = "circular", sx }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      ...sx,
    }}
  >
    {type === "circular" && <CircularProgress />}
    {type === "linear" && (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )}
  </Box>
);

Loader.propTypes = {
  type: PropTypes.string,
  sx: PropTypes.object,
};
