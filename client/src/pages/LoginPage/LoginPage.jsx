import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { StyledLayout, StyledForm, StyledLogo } from "./LoginPage.styled";
import { useState } from "react";
import { CREATE_ACCOUNT_ROUTE } from "routes";
import { PageLayout } from "components/PageLayout";
import { useUser } from "context/UserProvider/UserProvider";

export const LoginPage = () => {
  const { login } = useUser();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setFormInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    login(formInputs);
  };

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={7} md={5} lg={4} xl={3}>
            <StyledForm onSubmit={handleLogin}>
              <StyledLogo component="img" src="./logo.svg" />

              <TextField
                label="Email"
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formInputs.email}
                required
                onChange={handleOnChange}
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formInputs.password}
                required
                onChange={handleOnChange}
                fullWidth
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
