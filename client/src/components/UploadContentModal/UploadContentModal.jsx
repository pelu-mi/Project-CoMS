/**
 * Import Modules
 */
import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useContentForm } from "./hooks/useContentForm";
import { useParams } from "react-router-dom";

/**
 * Upload Content Modal
 */
export const UploadContentModal = ({ defaultValues, onClose, ...rest }) => {
  const {courseId} = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useContentForm({
    courseId,
    defaultValues,
    onClose,
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      title={defaultValues ? "Edit Content" : "Upload Content"}
      {...{ ...rest, onClose: handleClose }}
    >
      <Grid container mt={4} gap={3}>
        <TextField
          label="Title *"
          placeholder="Enter your content title"
          fullWidth
          error={errors.title}
          helperText={errors.title?.message}
          {...register("title")}
        />

        <TextField
          label="Description *"
          placeholder="Enter your content description"
          multiline
          rows={3}
          fullWidth
          error={errors.description}
          helperText={errors.description?.message}
          {...register("description")}
        />

        <TextField
          label="Link *"
          placeholder="Enter your content link"
          fullWidth
          error={errors.link}
          helperText={errors.link?.message}
          {...register("link")}
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
              {defaultValues ? "Save Changes" : "Post"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

// Specify types of props to be received by UploadContentModal
UploadContentModal.propTypes = {
  defaultValues: PropTypes.object,
  onClose: PropTypes.func,
};
