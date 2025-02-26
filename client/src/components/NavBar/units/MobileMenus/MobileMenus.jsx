/**
 * Import Modules
 */
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledNavLogo } from "components/NavBar/NavBar.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { MENUS } from "constants/menus";
import { HOME_ROUTE } from "routes";
import { StyledIconButton, StyledListItemButton } from "./MobileMenus.styled";

/**
 * Mobile Menus
 */
export const MobileMenus = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
            <StyledNavLogo />
          </ListItemButton>
        </ListItem>
        {MENUS.map(({ title, path }) => (
          <ListItem key={title} disablePadding onClick={() => navigate(path)}>
            <StyledListItemButton active={path === pathname}>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  fontWeight: path === pathname ? 600 : 500,
                }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
      <StyledIconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="secondary"
        onClick={toggleMobileNav(true)}
      >
        <MenuIcon sx={{ width: "28px", height: "28px" }} />
      </StyledIconButton>

      <Drawer
        open={openMobileNav}
        onClose={toggleMobileNav(false)}
        PaperProps={{
          sx: {
            backgroundImage: "none",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};
