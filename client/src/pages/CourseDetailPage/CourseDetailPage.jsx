import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { StyledActionContainer } from "pages/CourseListPage/CourseListPage.styled";
import { ROLES } from "constants/role";
import { useUser } from "context";
import {
  StyledBanner,
  StyledContentContainer,
  StyledEmptyLayout,
  StyledTitleActionContainer,
  StyledTitleContainer,
  StyledTypography,
  StyledTypographyWrapper,
} from "./CourseDetailPage.styled";
import { CourseContentCard } from "components/CourseContentCard";
import { FileAlertIcon } from "components/Icon";
import { Loader } from "components/Loader";
import { useCourseDetailQuery } from "services/api/course/useCourseDetailQuery";

export const CourseDetailPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const navigate = useNavigate();
  let { courseId } = useParams();

  const { course } = useCourseDetailQuery(courseId);

  const contents = [
    {
      title: "Brad traversy python tutorial",
      description: "IN depth dive into the world of python",
      link: "evmoeornornfkermglke",
    },
    {
      title: "Brad traversy python tutorial",
      description: "IN depth dive into the world of python",
      link: "evmoeornornfkermglke",
    },
  ];

  const renderUploadContentButton = () => {
    if (user.role === ROLES.instructor)
      return (
        <Button
          startIcon={<FileUploadIcon />}
          sx={{ minHeight: 56, flexGrow: 1 }}
          onClick={() => {}}
        >
          Upload Content
        </Button>
      );
  };

  const renderContents = () => {
    // if (isFetching) {
    //   return (
    //     <StyledEmptyLayout>
    //       <Loader />
    //     </StyledEmptyLayout>
    //   );
    // }

    if (contents.length) {
      return (
        <Grid container spacing={2}>
          {contents.map((course, index) => (
            <Grid item key={`${index}-${course.title}`} xs={12} sm={4} md={3}>
              <CourseContentCard
                title={course.title}
                description={course.description}
                onClick={() => navigate(`#`)}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <StyledEmptyLayout>
        <Box textAlign="center">
          <FileAlertIcon
            sx={{
              width: "140px",
              height: "140px",
              color: theme.palette.primary.icon,
            }}
          />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No Course Content
          </Typography>
        </Box>
        {renderUploadContentButton()}
      </StyledEmptyLayout>
    );
  };

  return (
    <>
      <Box pb={4}>
        <StyledBanner image="" />

        {course.name}

        <StyledTitleContainer>
          <StyledTypographyWrapper>
            <StyledTypography variant="h4">
              CS730 - Human-computer Interaction Fundamentals
            </StyledTypography>
            <StyledTypography variant="body1" color="text.secondary">
              Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.
              Lorem ipsum dolor sit amet consectetur. Cursus turpis euismod.
            </StyledTypography>
          </StyledTypographyWrapper>

          {user.role === ROLES.instructor && (
            <StyledTitleActionContainer>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={() => {}}
                sx={{ flexGrow: "1" }}
              >
                Students
              </Button>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => {}}
                sx={{ flexGrow: "1" }}
              >
                <nobr>Edit Course</nobr>
              </Button>
            </StyledTitleActionContainer>
          )}
        </StyledTitleContainer>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          mt={5}
          mb={3}
        >
          <Typography
            variant="h5"
            sx={{ my: { xs: "16px", sm: 0 }, pr: "16px", flexGrow: 20 }}
          >
            Course Content
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

            {renderUploadContentButton()}
          </StyledActionContainer>
        </Box>

        <StyledContentContainer>{renderContents()}</StyledContentContainer>
      </Box>
    </>
  );
};
