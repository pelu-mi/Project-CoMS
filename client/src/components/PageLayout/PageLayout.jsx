import PropTypes from "prop-types";

import { NavBar } from "components/NavBar";
import { Container } from "@mui/material";

export const PageLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container sx={{ paddingTop: "60px" }}>{children}</Container>
    </>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};
