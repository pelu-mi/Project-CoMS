import PropTypes from "prop-types";
import { Modal } from "components/Modal";
import { Button, Grid, Typography } from "@mui/material";
import { useUser } from "context";

export const ConfirmLogoutModal = ({ onClose, ...rest }) => {
  const { logout } = useUser();
  return (
    <Modal {...rest} hideCloseIcon contentStyles={{ maxWidth: "400px" }}>
      <Typography variant="h6" mb={4}>
        Are you sure to log out?
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            disableRipple
            onClick={onClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="error"
            sx={{ height: "100%" }}
            fullWidth
            onClick={() => logout()}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

ConfirmLogoutModal.propTypes = {
  onClose: PropTypes.func,
};
