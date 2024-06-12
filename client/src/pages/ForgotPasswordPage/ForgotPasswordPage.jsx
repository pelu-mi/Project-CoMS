/**
 * Import Modules
 */
import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { PageLayout } from "components/PageLayout";
import { Navigate, Link as RouterLink } from "react-router-dom";
import {
  StyledForm,
  StyledLayout,
  StyledLogo,
} from "pages/LoginPage/LoginPage.styled";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes";
import { useUser } from "context";
import { useForgotPasswordForm } from "./hooks/useForgotPasswordForm";

/**
 * Forgot Password Page
 */
export const ForgotPasswordPage = () => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForgotPasswordForm();

  if (user) return <Navigate to={HOME_ROUTE} />;

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <StyledForm onSubmit={handleSubmit}>
              <StyledLogo />

              <Typography variant="h5">Forgot Password?</Typography>
              <Typography variant="body1" alignSelf="flex-start">
                Enter your email address to receive an OTP to reset your
                password.
              </Typography>

              <TextField
                label="Email *"
                placeholder="example@mail.com"
                fullWidth
                error={errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <Button type="submit">Request OTP</Button>

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
