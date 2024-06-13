/**
 * Import Modules
 */
import PropTypes from "prop-types";

import { Button, Grid, Typography } from "@mui/material";
import { Modal } from "components/Modal";

/**
 * Confirm Discard Modal
 */
export const ConfirmDiscardModal = ({ onDiscard, onClose, ...rest }) => {
  return (
    <Modal
      {...{ ...rest, onClose }}
      title="Discard students changes?"
      contentStyles={{ maxWidth: "500px" }}
    >
      <Typography variant="body1" mt={2} mb={4}>
        Your student list will return to the previous one if you discard
        changes.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ height: "100%" }}
            fullWidth
            disableRipple
            onClick={onClose}
          >
            Keep Editing
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="error"
            sx={{ height: "100%" }}
            fullWidth
            onClick={() => onDiscard()}
          >
            Discard Changes
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

// Specify types of props to be received by ConfirmDiscardModal
ConfirmDiscardModal.propTypes = {
  onDiscard: PropTypes.func,
  onClose: PropTypes.func,
};
