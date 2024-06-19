import { Box, Grid, Typography, useTheme } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { CourseCard } from "components/CourseCard";
import { Loader } from "components/Loader";
import { useUser } from "context";
import {
  StyledCourseContainer,
  StyledEmptyLayout,
} from "pages/CourseListPage/CourseListPage.styled";
import { useNavigate } from "react-router-dom";
import { useCourseListQuery } from "services/api/course/useCourseListQuery";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";
import { ForumListTour } from "./components/ForumListTour";

export const ForumListPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const theme = useTheme();

  const { courses, isFetching } = useCourseListQuery(user.role);

  const renderTitle = () => {
    let title = "My Forums";

    if (courses.length > 0) {
      title += ` (${courses.length})`;
    }

    return title;
  };

  const renderCardDescription = (discussionCount) => {
    let description = `${discussionCount} Discussion`;

    if (discussionCount > 0) {
      description += "s";
    }

    return description;
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
                hideEditIcon
                courseId={course._id}
                name={course.name}
                description={renderCardDescription(course.discussionCount)}
                onClick={() =>
                  navigate(
                    `${COURSE_LIST_ROUTE}/${course._id}${FORUM_LIST_ROUTE}`
                  )
                }
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
            No Forums
          </Typography>
        </Box>
      </StyledEmptyLayout>
    );
  };

  return (
    <>
      <Box pb={4}>
        <Typography
          variant="h4"
          sx={{
            wordWrap: "break-word",
            marginY: 4,
            textTransform: "capitalize",
          }}
        >
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
              sx={{ my: { xs: "16px", sm: "14px" }, pr: "16px", flexGrow: 20 }}
            >
              {renderTitle()}
            </Typography>
          </Box>

          <Box display="flex" flexGrow={1} className="forum-list-step">
            {renderCourses()}
          </Box>
        </StyledCourseContainer>
      </Box>

      <ForumListTour />
    </>
  );
};
