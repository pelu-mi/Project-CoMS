import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useUser } from "context/UserProvider/UserProvider";
import {
  StyledActionContainer,
  StyledCourseContainer,
} from "./CourseListPage.styled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { CourseCard } from "components/CourseCard";
import { useNavigate } from "react-router-dom";
import { CreateCourseModal } from "./components/CreateCourseModal";
import { ROLES } from "constants/role";

const courses = [
  {
    title: "CS700 - Software Development Fundamentals",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.",
  },
  {
    title: "CS730",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.",
  },
  {
    title: "CS730 - Human-computer Interaction Fundamentals",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.",
  },
  {
    title: "CS730",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.",
  },
  {
    title: "CS730 - Human-computer Interaction Fundamentals",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.amet consectetur. Cursus turpis euismod.",
  },
];

export const CourseListPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();

  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages] = useState(1);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Box pb={4}>
        <Typography variant="h4" marginY={4}>
          Hello{" "}
          <Typography variant="h4" component="span" color="primary">
            {user.firstName}!
          </Typography>
        </Typography>

        <StyledCourseContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            mb={3}
          >
            <Typography
              variant="h5"
              sx={{ my: { xs: "16px", sm: 0 }, pr: "16px", flexGrow: 20 }}
            >
              {user.role === ROLES.instructor
                ? `My Courses(20)`
                : `Enrolled Courses`}
            </Typography>

            <StyledActionContainer>
              <TextField
                placeholder="Search"
                sx={{ flexGrow: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.grey[400] }} />
                    </InputAdornment>
                  ),
                }}
              />

              {user.role === ROLES.instructor && (
                <Button
                  startIcon={<AddIcon />}
                  sx={{ minHeight: 56, flexGrow: 1 }}
                  onClick={() => setOpenCreateAccount(true)}
                >
                  Create Course
                </Button>
              )}
            </StyledActionContainer>
          </Box>

          <Grid container spacing={2}>
            {courses.map((course, index) => (
              <Grid item key={`${index}-${course.title}`} xs={12} sm={4} md={3}>
                <CourseCard
                  title={course.title}
                  description={course.description}
                  onClick={() => navigate("/")}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              shape="rounded"
              onChange={handlePagination}
            />
          </Box>
        </StyledCourseContainer>
      </Box>
      <CreateCourseModal
        open={openCreateAccount}
        onClose={() => setOpenCreateAccount(false)}
      />
    </>
  );
};
