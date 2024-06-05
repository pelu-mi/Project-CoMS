import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { StyledLoginForm, StyledLoginLayout, StyledLogo } from "./styled";
import { useState } from "react";
import { CREATE_ACCOUNT_ROUTE } from "routes";
import { PageLayout } from "components/PageLayout";

export const LoginPage = () => {
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

  const handleOnSubmit = () => {};

  return (
    <PageLayout>
      <StyledLoginLayout>
        <Grid container justifyContent="center">
          <Grid md={5} lg={4} xl={3}>
            <StyledLoginForm onSubmit={handleOnSubmit}>
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

              <Button type="submit" variant="contained">
                Login
              </Button>

              <Divider sx={{ width: "100%" }}>OR</Divider>

              <Typography align="center">
                Doesn&apos;t have an account?{" "}
                <Link component={RouterLink} to={CREATE_ACCOUNT_ROUTE}>
                  Create account
                </Link>
              </Typography>
            </StyledLoginForm>
          </Grid>
        </Grid>
      </StyledLoginLayout>
    </PageLayout>
  );
};
