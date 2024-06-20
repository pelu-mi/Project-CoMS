/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Button, Grid, TextField } from "@mui/material";
import { useEditProfileForm } from "components/ProfileModal/hooks/useEditProfileForm";

/**
 * Edit Profile
 */
export const EditProfile = ({ onClose, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEditProfileForm({ onClose });

  return (
    <Grid
      component="form"
      mt={4}
      gap={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name *"
        placeholder="Enter your first name"
        fullWidth
        error={errors.firstName}
        helperText={errors.firstName?.message}
        {...register("firstName")}
      />
      <TextField
        label="Last Name *"
        placeholder="Enter your last name"
        fullWidth
        error={errors.lastName}
        helperText={errors.lastName?.message}
        {...register("lastName")}
      />

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditProfile.propTypes = {
  onClose: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};
