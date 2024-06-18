/**
 * Import Modules
 */
import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useDiscussionForm } from "./hooks/useDiscussionForm";

/**
 * DiscussionModal
 */
export const DiscussionModal = ({ onClose, ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useDiscussionForm({ onClose });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal title="Add Discussion" {...{ ...rest, onClose: handleClose }}>
      <Grid container mt={4} gap={3}>
        <TextField
          label="Topic *"
          placeholder="Enter your discussion topic"
          fullWidth
          error={errors.title}
          helperText={errors.title?.message}
          {...register("title")}
        />

        <Grid container spacing={2}>
          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disableRipple
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button sx={{ height: "100%" }} fullWidth onClick={handleSubmit}>
              Add Disscussion
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

// Specify types of props to be received by DiscussionModal
DiscussionModal.propTypes = {
  defaultValues: PropTypes.object,
  onClose: PropTypes.func,
};
