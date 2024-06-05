import { Box, Button, Container, Toolbar } from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { MobileMenus, UserMenus } from "./units";
import { useUser } from "context/UserProvider/UserProvider";

export const pages = ["Courses"];

export const NavBar = () => {
  const { user } = useUser();

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: !user ? "flex" : "none", sm: "flex" },
              }}
            >
              <StyledNavLogo component="img" src="./full-logo.svg" />
              {user &&
                pages.map((page) => (
                  <Button key={page} variant="text">
                    {page}
                  </Button>
                ))}
            </Box>

            {user && (
              <>
                <MobileMenus />

                <UserMenus />
              </>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};
