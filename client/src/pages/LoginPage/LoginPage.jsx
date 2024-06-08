import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { StyledLayout, StyledForm, StyledLogo } from "./LoginPage.styled";
import { CREATE_ACCOUNT_ROUTE, HOME_ROUTE } from "routes";
import { PageLayout } from "components/PageLayout";
import { useUser } from "context/UserProvider/UserProvider";
import { useLoginForm } from "./hooks/useLoginForm";

export const LoginPage = () => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  if (user) return <Navigate to={HOME_ROUTE} />;

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5} lg={4} xl={3}>
            <StyledForm onSubmit={handleSubmit}>
              <StyledLogo />

              <TextField
                label="Email"
                placeholder="example@mail.com"
                fullWidth
                error={errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                error={errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />

              <Button type="submit">Login</Button>

              <Divider sx={{ width: "100%" }}>OR</Divider>

              <Typography align="center">
                Doesn&apos;t have an account?{" "}
                <Link component={RouterLink} to={CREATE_ACCOUNT_ROUTE}>
                  Create account
                </Link>
              </Typography>
            </StyledForm>
          </Grid>
        </Grid>
      </StyledLayout>
    </PageLayout>
  );
};
