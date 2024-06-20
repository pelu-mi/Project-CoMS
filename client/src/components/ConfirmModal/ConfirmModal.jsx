/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Modal } from "components/Modal";
import { Button, Grid, Typography } from "@mui/material";

/**
 * Confirm Modal
 */
export const ConfirmModal = ({
  promptString,
  description,
  closeLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmColor = "primary",
  onClose,
  onConfirm,
  ...rest
}) => {
  return (
    <Modal
      {...{ ...rest, onClose }}
      hideCloseIcon
      contentStyles={{ maxWidth: "400px" }}
    >
      <Typography variant="h6">{promptString}</Typography>

      {description !== "" && (
        <Typography variant="body1" mt={3}>
          {description}
        </Typography>
      )}

      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            disableRipple
            onClick={onClose}
          >
            {closeLabel}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color={confirmColor}
            sx={{ height: "100%" }}
            fullWidth
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

// Specify types of props to be received by ConfirmModal
ConfirmModal.propTypes = {
  promptString: PropTypes.string.isRequired,
  description: PropTypes.string,
  closeLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  confirmColor: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
