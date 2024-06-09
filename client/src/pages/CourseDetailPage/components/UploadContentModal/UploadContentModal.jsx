import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";

export const UploadContentModal = ({ onClose, ...res }) => {
  const handleClose = () => {
    onClose();
    // reset();
  };

  return (
    <Modal
      title="Upload Content"
      aria-labelledby="create-account-form"
      aria-describedby="create-account-form"
      {...{ ...res, onClose: handleClose }}
    >
      <Grid container mt={4} gap={3}>
        <TextField
          label="Title *"
          placeholder="Enter your content title"
          fullWidth
          //   error={errors.title}
          //   helperText={errors.title?.message}
          //   {...register("title")}
        />

        <TextField
          label="Description"
          placeholder="Enter your content description"
          multiline
          rows={3}
          maxRows={5}
          fullWidth
          //   {...register("description")}
        />

        <TextField
          label="Link"
          placeholder="Enter your content link"
          fullWidth
          //   error={errors.link}
          //   helperText={errors.link?.message}
          //   {...register("link")}
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
            {/* TODO: Connect endpoint */}
            <Button sx={{ height: "100%" }} fullWidth onClick={() => {}}>
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

UploadContentModal.propTypes = {
  onClose: PropTypes.func,
};
