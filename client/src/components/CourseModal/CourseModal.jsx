import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useCourseForm } from "./hooks/useCourseForm";

export const CourseModal = ({ defaultValues, onClose, ...res }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCourseForm({ defaultValues, onClose });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      title={defaultValues ? "Edit Course" : "Create Course"}
      {...{ ...res, onClose: handleClose }}
    >
      <Grid container mt={4} gap={3}>
        <TextField
          label="Course Name *"
          placeholder="Enter your course name"
          fullWidth
          error={errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="Course Description"
          placeholder="Enter your course description"
          multiline
          rows={3}
          fullWidth
          {...register("description")}
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
              {defaultValues ? "Save Changes" : "Create Course"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

CourseModal.propTypes = {
  defaultValues: PropTypes.object,
  onClose: PropTypes.func,
};
