/**
 * Import Modules
 */
import { Box, Container, Toolbar } from "@mui/material";
import { StyledAppBar, StyledNavButton, StyledNavLogo } from "./NavBar.styled";
import { MobileMenus, UserMenus } from "./units";
import { useUser } from "context";
import { useLocation, useNavigate } from "react-router-dom";
import { MENUS } from "constants/menus";
import { HOME_ROUTE } from "routes";

/**
 * NavBar
 */
export const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <StyledAppBar position="fixed">
      <Container sx={{ height: "100%" }}>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: !user ? "flex" : "none", sm: "flex" },
            }}
          >
            <StyledNavLogo onClick={() => navigate(HOME_ROUTE)} />
            {user &&
              MENUS.map(({ title, path }) => (
                <StyledNavButton
                  key={title}
                  variant="text"
                  onClick={() => navigate(path)}
                  disableRipple
                  active={path === pathname}
                >
                  {title}
                </StyledNavButton>
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
