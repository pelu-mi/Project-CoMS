/**
 * Import Modules
 */
import { Button, Grid, Typography } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useUser } from "context";

/**
 * Profile Modal
 */
export const ProfileModal = ({ onClose, ...rest }) => {
  const { user } = useUser();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  return (
    <Modal
      title={`${user.firstName} ${user.lastName}`}
      contentStyles={{ maxWidth: "450px" }}
      {...{ ...rest, onClose }}
    >
      <Grid container mt={4} gap={3} display="flex" justifyContent="center">
        <Grid container spacing={1}>
          <Grid item xs={4} sm={3}>
            <Typography>Email:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ wordBreak: "break-word" }}>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={3}>
            <Typography>Timezone:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ wordBreak: "break-word" }}>{timeZone}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={3}>
            <Typography>Role:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{ wordBreak: "break-word", textTransform: "capitalize" }}
            >
              {user.role}
            </Typography>
          </Grid>
        </Grid>

        <Button variant="outlined" href={`mailto:pelumifadolapo7@gmail.com`}>
          Contact Support
        </Button>
      </Grid>
    </Modal>
  );
};

// Specify types of props to be received by ProfileModal
ProfileModal.propTypes = {
  onClose: PropTypes.func,
};
