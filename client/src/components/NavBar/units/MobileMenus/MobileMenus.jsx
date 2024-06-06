import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledNavLogo } from "components/NavBar/NavBar.styled";
import { useNavigate } from "react-router-dom";
import { MENUS } from "constants/menus";
import { HOME_ROUTE } from "routes";

export const MobileMenus = () => {
  const navigate = useNavigate();
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
        <ListItem disablePadding onClick={() => navigate(HOME_ROUTE)}>
          <ListItemButton>
            <StyledNavLogo component="img" src="./full-logo.svg" />
          </ListItemButton>
        </ListItem>
        {MENUS.map(({ title, path }) => (
          <ListItem key={title} disablePadding onClick={() => navigate(path)}>
            <ListItemButton>
              <ListItemText primary={title} />
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
