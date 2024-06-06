import { Box, Button, Container, Toolbar } from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { MobileMenus, UserMenus } from "./units";
import { useUser } from "context/UserProvider/UserProvider";
import { COURSE_LIST_ROUTE } from "routes";
import { useNavigate } from "react-router-dom";

export const pages = [{ title: "Courses", path: COURSE_LIST_ROUTE }];

export const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <StyledAppBar position="fixed">
        <Container sx={{ height: "100%" }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: !user ? "flex" : "none", sm: "flex" },
              }}
            >
              <StyledNavLogo component="img" src="./full-logo.svg" />
              {user &&
                pages.map(({ title, path }) => (
                  <Button key={title} variant="text" onClick={navigate(path)}>
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
    </>
  );
};
