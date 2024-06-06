import { Button, Grid, TextField } from "@mui/material";
import { Modal } from "components/Modal";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CreateCourseModal = ({ onClose, ...res }) => {
  const [formInputs, setFormInputs] = useState({
    courseName: "",
    courseDescription: "",
  });

  const handleOnChange = (event) => {
    setFormInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    console.log("formInputs", formInputs);
  }, [formInputs, setFormInputs]);

  return (
    <Modal
      title="Create Course"
      aria-labelledby="create-account-form"
      aria-describedby="create-account-form"
      {...{ ...res, onClose }}
    >
      <Grid container mt={4} gap={3}>
        <TextField
          label="Course Name"
          name="courseName"
          placeholder="Enter your course name"
          value={formInputs.email}
          required
          onChange={handleOnChange}
          fullWidth
        />

        <TextField
          label="Course Description"
          placeholder="Enter your course description"
          multiline
          rows={3}
          maxRows={5}
          onChange={handleOnChange}
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
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
          <Grid item xs={12} sm={6}>
            <Button sx={{ height: "100%" }} fullWidth>
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
