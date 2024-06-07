import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useCreateCoursForm } from "pages/CourseListPage/hooks/useCreateCourseForm";

export const CreateCourseModal = ({ onClose, ...res }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useCreateCoursForm({ onClose });

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      title="Create Course"
      aria-labelledby="create-account-form"
      aria-describedby="create-account-form"
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
          maxRows={5}
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
              Create Course
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

CreateCourseModal.propTypes = {
  onClose: PropTypes.func,
};
