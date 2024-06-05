import { Box, Container, Toolbar } from "@mui/material";
import { StyledAppBar } from "./NavBar.styled";

export const NavBar = () => {
  const pages = ["Courses"];

  return (
    <StyledAppBar position="fixed" color="transparent">
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar disableGutters>
          <Box component="img" src="./full-logo.svg" />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};
