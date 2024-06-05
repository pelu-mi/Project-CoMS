import {
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { PageLayout } from "components/PageLayout";
import { useState } from "react";
import { LOGIN_ROUTE } from "routes";
import { StyledLayout, StyledForm } from "pages/LoginPage/LoginPage.styled";

export const CreateAccountPage = () => {
  const [formInputs, setFormInputs] = useState({
    role: "student",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setFormInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectingRole = (event) => {
    setFormInputs((prev) => ({ ...prev, role: event.target.name }));
  };

  const handleOnSubmit = () => {};

  return (
    <PageLayout>
      <StyledLayout>
        <Grid container justifyContent="center">
          <Grid item md={5} lg={4} xl={3}>
            <StyledForm onSubmit={handleOnSubmit}>
              <Grid container flexDirection="column" gap="16px">
                <Typography variant="h5">Create an account for:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      name="student"
                      variant={
                        formInputs.role === "student" ? "contained" : "outlined"
                      }
                      fullWidth
                      sx={{ height: "100%" }}
                      disableRipple
                      onClick={handleSelectingRole}
                    >
                      Student
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      name="instructor"
                      variant={
                        formInputs.role !== "student" ? "contained" : "outlined"
                      }
                      fullWidth
                      sx={{ height: "100%" }}
                      disableRipple
                      onClick={handleSelectingRole}
                    >
                      Instructor
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <TextField
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                value={formInputs.firstName}
                onChange={handleOnChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                value={formInputs.lastName}
                onChange={handleOnChange}
                fullWidth
              />
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
                placeholder="At least 8 characters"
                value={formInputs.password}
                required
                onChange={handleOnChange}
                fullWidth
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
