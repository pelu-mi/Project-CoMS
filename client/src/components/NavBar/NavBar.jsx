import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { useState } from "react";
import { MobileMenus } from "./units";

export const pages = ["Courses"];
const settings = ["Profile", "Logout"];

export const NavBar = () => {
  const [user, setUser] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};
