/**
 * Import Modules
 */
import { Box, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoIcon from "@mui/icons-material/Info";
import { useColorMode, useUser } from "context";
import { useState } from "react";
import { StyledButton } from "./UserMenus.styled";
import { ConfirmLogoutModal } from "../ConfirmLogoutModal";
import { ProfileModal } from "components/ProfileModal";
import { Avatar } from "components/Avatar";
import { useGuide } from "hooks/useGuide";

/**
 * User Menus
 */
export const UserMenus = () => {
  const { user } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isActiveGuides, handleToggleGuides } = useGuide();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const settings = [
    {
      title: "Profile",
      icon: <AccountCircleIcon color="student" />,
      action: () => setShowProfileModal(true),
    },
    {
      title: "Contact Support",
      icon: <InfoIcon color="info" />,
      action: () => window.open("mailto:pelumifadolapo7@gmail.com"),
    },
    {
      title: colorMode === "dark" ? "Light Theme" : "Dark Theme",
      icon: colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />,
      action: () => toggleColorMode(),
    },
    {
      title: isActiveGuides ? "Turn Off Guides" : "Turn On Guides",
      icon: <HelpIcon color="primary" />,
      action: handleToggleGuides,
    },
    {
      title: "Logout",
      icon: <LogoutIcon color="error" />,
      action: () => setShowConfirmLogoutModal(true),
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <StyledButton
            startIcon={
              <Avatar src="/.jpg" name={`${user.firstName} ${user.lastName}`} />
            }
            endIcon={<ExpandMoreIcon />}
            variant="outlined"
            disableRipple
            onClick={handleOpenUserMenu}
          >
            <Typography
              variant="button"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "148px",
                textTransform: "capitalize",
              }}
            >
              {user.firstName}
            </Typography>
          </StyledButton>
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
          {settings.map(({ title, icon, action }) => (
            <MenuItem
              key={title}
              onClick={() => {
                handleCloseUserMenu();
                action();
              }}
            >
              {icon}
              <Typography textAlign="center" ml="12px">
                {title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <ConfirmLogoutModal
        open={showConfirmLogoutModal}
        onClose={() => setShowConfirmLogoutModal(false)}
      />
      <ProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};
