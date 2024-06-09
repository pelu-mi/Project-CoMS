import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "context/UserProvider/UserProvider";
import { useState } from "react";
import { StyledButton } from "./UserMenus.styled";
import { ConfirmLogoutModal } from "../ConfirmLogoutModal";

export const UserMenus = () => {
  const { user } = useUser();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

  const settings = [
    {
      title: "Profile",
      icon: <AccountCircleIcon color="primary" />,
      action: () => {},
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
              <Avatar alt={`${user.firstName} ${user.lastName}`} src="/.jpg" />
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
    </>
  );
};
