import PropTypes from "prop-types";
import { Button, Grid, Typography } from "@mui/material";
import { useUser } from "context";

export const ProfileInfo = ({ onEdit }) => {
  const { user } = useUser();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return (
    <Grid container mt={4} gap={3} display="flex" justifyContent="center">
      <Grid container spacing={1}>
        <Grid item xs={4} sm={3}>
          <Typography>Email:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ wordBreak: "break-word" }}>{user.email}</Typography>
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

      <Button variant="outlined" sx={{ marginTop: "8px" }} onClick={onEdit}>
        Edit Profile
      </Button>
    </Grid>
  );
};

ProfileInfo.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
