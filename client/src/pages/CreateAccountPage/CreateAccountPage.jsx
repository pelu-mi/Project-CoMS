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
import { Navigate, Link as RouterLink } from "react-router-dom";
import { PageLayout } from "components/PageLayout";
import { HOME_ROUTE, LOGIN_ROUTE } from "routes";
import { StyledLayout, StyledForm } from "pages/LoginPage/LoginPage.styled";
import { useUser } from "context";
import { ROLES } from "constants/role";
import { useCreateAccountForm } from "./hooks/useCreateAccountForm";
import { PasswordTextField } from "components/PasswordTextField";

/**
 * Create Account Page
 */
export const CreateAccountPage = () => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useCreateAccountForm();
  const role = watch("role");

  const handleRole = (event) => {
    setValue("role", event.target.name);
  };

  if (user) return <Navigate to={HOME_ROUTE} />;

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <StyledForm onSubmit={handleSubmit}>
              <Grid container flexDirection="column" gap="16px">
                <Typography variant="h5">Create an account for:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      name={ROLES.student}
                      variant={
                        role === ROLES.student ? "contained" : "outlined"
                      }
                      fullWidth
                      sx={{ height: "100%" }}
                      disableRipple
                      onClick={handleRole}
                    >
                      Student
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      name={ROLES.instructor}
                      variant={
                        role !== ROLES.student ? "contained" : "outlined"
                      }
                      fullWidth
                      sx={{ height: "100%" }}
                      disableRipple
                      onClick={handleRole}
                    >
                      Instructor
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <input type="hidden" value={role} {...register("role")} />

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
              <TextField
                label="Email *"
                placeholder="example@mail.com"
                fullWidth
                error={errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <PasswordTextField
                label="Password *"
                placeholder="At least 8 characters"
                fullWidth
                error={errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
              <PasswordTextField
                label="Confirm Password *"
                placeholder="At least 8 characters"
                fullWidth
                error={errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button type="submit">Create Account</Button>

              <Divider sx={{ width: "100%" }}>OR</Divider>

              <Typography align="center">
                Already have an account?{" "}
                <Link component={RouterLink} to={LOGIN_ROUTE}>
                  Log in
                </Link>
              </Typography>
            </StyledForm>
          </Grid>
        </Grid>
      </StyledLayout>
    </PageLayout>
  );
};
