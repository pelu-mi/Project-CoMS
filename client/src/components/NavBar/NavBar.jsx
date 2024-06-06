import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { MobileMenus, UserMenus } from "./units";
import { useUser } from "context/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import { MENUS } from "constants/menus";
import { HOME_ROUTE } from "routes";

export const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <StyledAppBar position="fixed">
      <Container sx={{ height: "100%" }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: !user ? "flex" : "none", sm: "flex" },
            }}
          >
            <StyledNavLogo
              component="img"
              src="./full-logo.svg"
              onClick={() => navigate(HOME_ROUTE)}
            />
            {user &&
              MENUS.map(({ title, path }) => (
                <Button
                  key={title}
                  variant="text"
                  onClick={() => navigate(path)}
                  disableRipple
                >
                  {title}
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
  );
};
