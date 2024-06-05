import { AppBar, Container } from "@mui/material";

export const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ height: "60px" }}>
      <Container maxWidth="xl">This is navbar</Container>
    </AppBar>
  );
};
