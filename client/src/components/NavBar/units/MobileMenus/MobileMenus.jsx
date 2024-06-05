import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { pages } from "components/NavBar/NavBar";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledNavLogo } from "components/NavBar/NavBar.styled";

export const MobileMenus = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

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
        <ListItem disablePadding>
          <ListItemButton>
            <StyledNavLogo component="img" src="./full-logo.svg" />
          </ListItemButton>
        </ListItem>
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

  return (
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
  );
};
