/**
 * Import Modules
 */
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import CircleIcon from "@mui/icons-material/Circle";
import { ForumRules } from "components/ForumRules";
import { useUser } from "context";
import { useParams, Link as RouterLink } from "react-router-dom";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";
import {
  StyledAvatar,
  StyledCommentContainer,
  StyledCommentForm,
  StyledTypography,
} from "./DiscussionDetailPage.styled";
import { StyledEmptyLayout } from "pages/DiscussionListPage/DiscussionListPage.styled";
import { CommentCard } from "components/CommentCard";
import { useTheme } from "@emotion/react";
import { CommentAvatar } from "components/CommentCard/units/CommentAvatar";
import { useCommentListQuery } from "services/api/forum/useCommentListQuery";
import { Loader } from "components/Loader";
import { useCourseDetailQuery } from "services/api/courseDetail/useCourseDetailQuery";
import { useCommentForm } from "./hooks/useCommentForm";
import { useEffect, useState } from "react";
import moment from "moment";
import { DiscussionDetailTour } from "./components/DiscussionDetailTour";

/**
 * Discussion Detail page
 */
export const DiscussionDetailPage = () => {
  const { user } = useUser();
  const { courseId, discussionId } = useParams();
  const theme = useTheme();

  const { course } = useCourseDetailQuery(courseId);
  const {
    discussionDetails,
    comments: initialComments,
    isFetching,
  } = useCommentListQuery(discussionId);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (initialComments) {
      setComments(initialComments);
    }
  }, [initialComments]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCommentForm({ setComments });

  const renderComments = () => {
    if (isFetching) {
      return (
        <StyledEmptyLayout sx={{ minHeight: "40vh" }}>
          <Loader />
        </StyledEmptyLayout>
      );
    }

    if (comments.length) {
      return (
        <Grid container spacing={2}>
          {comments.map((comment, index) => (
            <Grid item xs={12} key={index}>
              <CommentCard
                commentId={comment._id}
                content={comment.content}
                author={{
                  _id: comment.creator,
                  firstName: comment.firstName,
                  lastName: comment.lastName,
                }}
                date={comment.createdAt}
                setComments={setComments}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <StyledEmptyLayout sx={{ minHeight: "40vh" }}>
        <Box textAlign="center">
          <AnnouncementIcon
            sx={{
              width: "140px",
              height: "140px",
              path: {
                fill: theme.palette.primary.icon,
              },
            }}
          />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No Comments
          </Typography>
        </Box>
      </StyledEmptyLayout>
    );
  };

  return (
    <>
      <Box pb={8} pt={3}>
        <ForumRules />

        <Breadcrumbs aria-label="breadcrumb" pt={5}>
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`${COURSE_LIST_ROUTE}/${courseId}`}
          >
            {course.name}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`${COURSE_LIST_ROUTE}/${courseId}${FORUM_LIST_ROUTE}`}
          >
            Forum
          </Link>
          <Typography color="text.primary" fontWeight={500}>
            {discussionDetails.title}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h4" mt={4} mb={3} textAlign="center">
          {discussionDetails.title}
        </Typography>

        <Box display="flex" flexWrap="wrap" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" fontWeight={500}>
              By
            </Typography>

            <StyledAvatar
              name={`${discussionDetails.firstName} ${discussionDetails.lastName}`}
            />

            <Tooltip
              title={`${discussionDetails.firstName} ${discussionDetails.lastName}`}
            >
              <StyledTypography variant="body1" fontWeight={500}>
                {discussionDetails.firstName} {discussionDetails.lastName}
              </StyledTypography>
            </Tooltip>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CircleIcon sx={{ width: "4px", color: "text.secondary" }} />

            <Typography variant="body2" color="text.secondary">
              {moment(discussionDetails.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

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
            {comments.length} Comment{comments.length > 1 && "s"}
          </Typography>
        </Box>

        <StyledCommentContainer>
          <Box className="comment-list-step">{renderComments()}</Box>

          <StyledCommentForm
            className="add-comment-step"
            id="add-comment"
            onSubmit={handleSubmit}
          >
            <CommentAvatar
              author={{ firstName: user.firstName, lastName: user.lastName }}
            />

            <TextField
              label="Your Comment"
              placeholder="Enter your comment"
              multiline
              rows={3}
              fullWidth
              error={errors.content}
              helperText={errors.content?.message}
              {...register("content")}
            />

            <Button
              type="submit"
              endIcon={<SendIcon />}
              sx={{ width: "fit-content" }}
            >
              Submit
            </Button>
          </StyledCommentForm>
        </StyledCommentContainer>
      </Box>

      <DiscussionDetailTour />
    </>
  );
};
