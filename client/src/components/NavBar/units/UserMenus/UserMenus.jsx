/**
 * Import Modules
 */
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "context";
import { useState } from "react";
import { StyledButton } from "./UserMenus.styled";
import { ConfirmLogoutModal } from "../ConfirmLogoutModal";
import { stringAvatar } from "utils/stringAvatar";
import { ProfileModal } from "components/ProfileModal";

/**
 * User Menus
 */
export const UserMenus = () => {
  const { user } = useUser();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const settings = [
    {
      title: "Profile",
      icon: <AccountCircleIcon color="primary" />,
      action: () => setShowProfileModal(true),
    },
    {
      title: "Contact Support",
      icon: <HelpIcon color="info" />,
      action: () => window.open("mailto:pelumifadolapo7@gmail.com"),
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
              <Avatar
                src="/.jpg"
                {...stringAvatar(`${user.firstName} ${user.lastName}`)}
              />
            }
            endIcon={<ExpandMoreIcon />}
            variant="outlined"
            disableRipple
            onClick={handleOpenUserMenu}
          >
            {user.firstName}
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
              <Typography textAlign="center" onClick={action} ml="12px">
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
