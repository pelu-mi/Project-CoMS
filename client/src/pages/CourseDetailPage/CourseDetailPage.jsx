/**
 * Import Modules
 */
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
import GroupIcon from "@mui/icons-material/Group";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
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
import { AddStudentModal } from "components/AddStudentModal";
import { useState } from "react";
import { UploadContentModal } from "components/UploadContentModal";
import { CourseModal } from "components/CourseModal";
import { useCourseDetailQuery } from "services/api/courseDetail/useCourseDetailQuery";
import { useCourseContentQuery } from "services/api/courseDetail/useCourseContentQuery";
import { getRandomImageUrl } from "utils/getRandomImageUrl";
import { CourseDetailTour } from "./components/CourseDetailTour";

/**
 * Course Details Page
 */
export const CourseDetailPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  let { courseId } = useParams();
  const [openStudentModal, setOpenStudentModal] = useState();
  const [openUploadModal, setOpenUploadModal] = useState();
  const [openEditCourseModal, setOpenEditCourseModal] = useState();

  const { course, isFetching: isCourseFetching } =
    useCourseDetailQuery(courseId);
  const { contents, isFetching: isContentFetching } =
    useCourseContentQuery(courseId);

  const renderUploadContentButton = () => {
    if (user.role === ROLES.instructor)
      return (
        <Button
          className="upload-content-step"
          startIcon={<FileUploadIcon />}
          sx={{ minHeight: 56, flexGrow: 1 }}
          onClick={() => setOpenUploadModal(true)}
        >
          Upload Content
        </Button>
      );
  };

  const renderContents = () => {
    if (isContentFetching) {
      return (
        <StyledEmptyLayout>
          <Loader />
        </StyledEmptyLayout>
      );
    }

    if (contents.length) {
      return (
        <Grid container spacing={2}>
          {contents.map((content, index) => (
            <Grid item key={`${index}-${content.title}`} xs={12} sm={4} md={3}>
              <CourseContentCard
                courseContentId={content._id}
                title={content.title}
                description={content.description}
                link={content.link}
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
              path: {
                fill: theme.palette.primary.icon,
              },
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
        <StyledBanner image={getRandomImageUrl(courseId, 1392, 200)} />

        <StyledTitleContainer>
          <StyledTypographyWrapper>
            <StyledTypography variant="h4">{course.name}</StyledTypography>
            <StyledTypography variant="body1" color="text.secondary">
              {course.description}
            </StyledTypography>
          </StyledTypographyWrapper>

          {user.role === ROLES.instructor && (
            <StyledTitleActionContainer>
              <Button
                className="manage-student-step"
                variant="outlined"
                startIcon={<GroupIcon />}
                onClick={() => setOpenStudentModal(true)}
                sx={{ flexGrow: "1" }}
              >
                Students
              </Button>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setOpenEditCourseModal(true)}
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
              disabled={contents.length === 0}
            />

            {renderUploadContentButton()}
          </StyledActionContainer>
        </Box>

        <StyledContentContainer className="content-list-step">
          {renderContents()}
        </StyledContentContainer>
      </Box>

      <AddStudentModal
        open={openStudentModal}
        onClose={() => setOpenStudentModal(false)}
      />
      <UploadContentModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
      />
      {!isCourseFetching && (
        <CourseModal
          open={openEditCourseModal}
          onClose={() => setOpenEditCourseModal(false)}
          defaultValues={{
            courseId,
            name: course.name,
            description: course.description,
          }}
        />
      )}

      <CourseDetailTour />
    </>
  );
};
