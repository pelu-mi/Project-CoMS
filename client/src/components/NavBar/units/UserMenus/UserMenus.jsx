import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useUser } from "context/UserProvider/UserProvider";
import { useState } from "react";

export const UserMenus = () => {
  const { user, logout } = useUser();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = [
    { title: "Profile", action: () => {} },
    { title: "Logout", action: logout },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={`${user.firstName} ${user.lastName}`} src="/.jpg" />
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
        {settings.map(({ title, action }) => (
          <MenuItem
            key={title}
            onClick={() => {
              handleCloseUserMenu();
              action();
            }}
          >
            <Typography textAlign="center" onClick={action}>
              {title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
