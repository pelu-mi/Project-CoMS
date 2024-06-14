/**
 * Import Modules
 */
import PropTypes from "prop-types";

import { NavBar } from "components/NavBar";
import { Container } from "@mui/material";

/**
 * Page Layout
 */
export const PageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container sx={{ paddingTop: "64px", height: "100%" }}>
        {children}
      </Container>
    </>
  );
};

// Specify types of props to be received by PageLayout
PageLayout.propTypes = {
  children: PropTypes.node,
};
