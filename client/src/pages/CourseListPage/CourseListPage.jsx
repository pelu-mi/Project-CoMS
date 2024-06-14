/**
 * Import Modules
 */
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useUser } from "context";
import {
  StyledActionContainer,
  StyledCourseContainer,
  StyledEmptyLayout,
} from "./CourseListPage.styled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { CourseCard } from "components/CourseCard";
import { useNavigate } from "react-router-dom";
import { ROLES } from "constants/role";
import { useCourseListQuery } from "services/api/course/useCourseListQuery";
import { Loader } from "components/Loader";
import InboxIcon from "@mui/icons-material/Inbox";
import { COURSE_LIST_ROUTE } from "routes";
import { CourseModal } from "components/CourseModal";
import ReactJoyride, { STATUS } from "react-joyride";

const steps = [
  {
    target: ".create-course-step",
    content: "You can create course over here.",
    disableBeacon: true,
  },
  {
    target: ".course-list-step",
    content: "Find your course list here.",
    disableBeacon: true,
  },
];

/**
 * Course List Page
 */
export const CourseListPage = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const theme = useTheme();

  const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false);
  const [tutorialPassed, setTutorialPassed] = useState(() => {
    return localStorage.getItem("courseListTutorialPassed");
  });

  // NOTE: Pagination for next phase
  // const [page, setPage] = useState(1);
  // const [totalPages] = useState(1);
  // const handlePagination = (event, value) => {
  //   setPage(value);
  // };

  const { courses, isFetching } = useCourseListQuery(user.role);

  const renderTitle = () => {
    let title = "";

    if (user.role === ROLES.instructor) {
      title += "My Courses";
    } else {
      title += "Enrolled Courses";
    }

    if (courses.length > 0) {
      title += ` (${courses.length})`;
    }

    return title;
  };

  const renderCreateCourseButton = () => {
    if (user.role === ROLES.instructor)
      return (
        <Button
          className="create-course-step"
          startIcon={<AddIcon />}
          sx={{ minHeight: 56, flexGrow: 1 }}
          onClick={() => setOpenCreateCourseModal(true)}
        >
          Create Course
        </Button>
      );
  };

  const renderCourses = () => {
    if (isFetching) {
      return (
        <StyledEmptyLayout>
          <Loader />
        </StyledEmptyLayout>
      );
    }

    if (courses.length) {
      return (
        <Grid container spacing={2} height="fit-content">
          {courses.map((course, index) => (
            <Grid item key={`${index}-${course.title}`} xs={12} sm={4} md={3}>
              <CourseCard
                courseId={course._id}
                name={course.name}
                description={course.description}
                onClick={() => navigate(`${COURSE_LIST_ROUTE}/${course._id}`)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <StyledEmptyLayout>
        <Box textAlign="center">
          <InboxIcon
            sx={{
              width: "140px",
              height: "140px",
              color: theme.palette.primary.icon,
            }}
          />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No Courses
          </Typography>
        </Box>
        {renderCreateCourseButton()}
      </StyledEmptyLayout>
    );
  };

  return (
    <>
      {/* {!tutorialPassed && ( */}
        <ReactJoyride
          callback={({ status }) => {
            if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
              // Call api to set the completion flag
              window.localStorage.setItem("courseListTutorialPassed", true);
              setTutorialPassed(true);
            }
          }}
          showProgress
          showSkipButton
          // spotlightClicks
          continuous
          styles={{
            options: {
              zIndex: 1100,
            },
          }}
          steps={steps}
        />
      {/* )} */}

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
              {renderTitle()}
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
                disabled={courses.length === 0}
              />

              {renderCreateCourseButton()}
            </StyledActionContainer>
          </Box>

          <Box display="flex" flexGrow={1} className="course-list-step">
            {renderCourses()}
          </Box>

          {/* NOTE: Pagination for next phase */}
          {/* <Box display="flex" justifyContent="flex-end" mt={2}>
            <Pagination
              count={totalPages}
              page={page}
              shape="rounded"
              onChange={handlePagination}
            />
          </Box> */}
        </StyledCourseContainer>
      </Box>
      <CourseModal
        open={openCreateCourseModal}
        onClose={() => setOpenCreateCourseModal(false)}
      />
    </>
  );
};
