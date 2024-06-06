import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "context/UserProvider/UserProvider";
import { useState } from "react";
import { StyledButton } from "./UserMenus.styled";

export const UserMenus = () => {
  const { user, logout } = useUser();
  const theme = useTheme();
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
        <StyledButton
          startIcon={
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src="/.jpg"
              sx={{ background: theme.palette.primary.main }}
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
