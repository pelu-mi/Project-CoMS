import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { PageLayout } from "components/PageLayout";
import {
  StyledForm,
  StyledLayout,
  StyledLogo,
} from "pages/LoginPage/LoginPage.styled";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "routes";

export const ResetPasswordPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) return <Navigate to={LOGIN_ROUTE} />;

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <StyledForm onSubmit={() => {}}>
              <StyledLogo />

              <Typography variant="h5">Reset Password</Typography>
              <Typography variant="body1" alignSelf="flex-start">
                Enter the OTP code you received in your email{" "}
                <strong>({email})</strong> and your new password.
              </Typography>

              <TextField
                label="OTP Code"
                placeholder="Enter your OTP code from your email"
                fullWidth
                // error={errors.resetPin}
                // helperText={errors.resetPin?.message}
                // {...register("resetPin")}
              />

              <TextField
                label="New Password"
                placeholder="Enter your new password"
                fullWidth
                // error={errors.newPassword}
                // helperText={errors.newPassword?.message}
                // {...register("newPassword")}
              />

              <TextField
                label="Confirm New Password"
                placeholder="Enter your confirmation password"
                fullWidth
                // error={errors.confirmPassword}
                // helperText={errors.confirmPassword?.message}
                // {...register("confirmPassword")}
              />

              <Button type="submit">Change Password</Button>

              <Divider sx={{ width: "100%" }}>OR</Divider>

              <Typography align="center">
                <Link component={RouterLink} to={LOGIN_ROUTE}>
                  Back to login
                </Link>
              </Typography>
            </StyledForm>
          </Grid>
        </Grid>
      </StyledLayout>
    </PageLayout>
  );
};
