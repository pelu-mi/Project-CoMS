import { Box, Button, Container, Toolbar } from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { useState } from "react";
import { MobileMenus, UserMenus } from "./units";

export const pages = ["Courses"];

export const NavBar = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar disableGutters>
            {/* TODO: responsive side menu */}
            {/* TODO: show if login */}
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
