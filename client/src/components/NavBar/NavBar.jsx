import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledAppBar, StyledNavLogo } from "./NavBar.styled";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Courses"];
const settings = ["Profile", "Logout"];

export const NavBar = () => {
  // const [user, setUser] = useState(null);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const toggleMobileNav = (newOpen) => () => {
    setOpenMobileNav(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleMobileNav(false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              <StyledNavLogo component="img" src="./full-logo.svg" />
              {pages.map((page) => (
                <Button key={page} variant="text">
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMobileNav(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer open={openMobileNav} onClose={toggleMobileNav(false)}>
                {DrawerList}
              </Drawer>
            </Box>

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
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  );
};
