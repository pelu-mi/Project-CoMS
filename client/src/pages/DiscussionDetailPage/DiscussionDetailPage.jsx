import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import CircleIcon from "@mui/icons-material/Circle";
import { ForumRules } from "components/ForumRules";
import { useUser } from "context";
import { useParams, Link as RouterLink, useLocation } from "react-router-dom";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";
import {
  StyledAvatar,
  StyledCommentContainer,
  StyledCommentForm,
} from "./DiscussionDetailPage.styled";
import { StyledEmptyLayout } from "pages/DiscussionListPage/DiscussionListPage.styled";
import { CommentCard } from "components/CommentCard";
import { useTheme } from "@emotion/react";
import { CommentAvatar } from "components/CommentCard/units/CommentAvatar";
// import { Loader } from "components/Loader";

const comments = [
  {
    _id: "123",
    author: {
      _id: "1",
      firstName: "Ellen",
      lastName: "Sam",
    },
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },

  {
    _id: "123",
    author: {
      _id: "1",
      firstName: "Ellen",
      lastName: "Sam",
    },
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

export const DiscussionDetailPage = () => {
  const { user } = useUser();
  const { courseId } = useParams();
  const theme = useTheme();
  const location = useLocation();
  const courseName = location.state?.courseName;

  const renderComments = () => {
    // if (isCommentFetching) {
    //   return (
    //     <StyledEmptyLayout>
    //       <Loader />
    //     </StyledEmptyLayout>
    //   );
    // }

    if (comments.length) {
      return (
        <Grid container spacing={2}>
          {comments.map((comment, index) => (
            <Grid item xs={12} key={index}>
              <CommentCard
                comment={comment.comment}
                author={comment.author}
                date="10 mins ago"
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <StyledEmptyLayout>
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
    <Box pb={6}>
      <Breadcrumbs aria-label="breadcrumb" py={3}>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={`${COURSE_LIST_ROUTE}/${courseId}`}
        >
          {courseName}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to={`${COURSE_LIST_ROUTE}/${courseId}${FORUM_LIST_ROUTE}`}
          state={{ courseName }}
        >
          Forum
        </Link>
        <Typography color="text.primary" fontWeight={500}>
          Module 1: Introduction to matematics
        </Typography>
      </Breadcrumbs>

      <ForumRules />

      <Typography variant="h4" mt={4} mb={3}>
        Module 1: Introduction to matematics
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body1" fontWeight={500}>
          By
        </Typography>

        <StyledAvatar name={`John Sam`} />

        <Typography variant="body1" fontWeight={500}>
          John Sam
        </Typography>

        <CircleIcon sx={{ width: "4px", color: "text.secondary" }} />

        <Typography variant="body2" color="text.secondary">
          10 mins ago
        </Typography>
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

      <StyledCommentContainer className="comment-list-step">
        {renderComments()}
      </StyledCommentContainer>

      <StyledCommentForm className="add-comment-step" id="add-comment">
        <CommentAvatar
          author={{ firstName: user.firstName, lastName: user.lastName }}
        />

        <TextField
          label="Your Comment"
          placeholder="Enter your comment"
          multiline
          rows={3}
          fullWidth
          // {...register("comment")}
        />

        <Button
          type="submit"
          endIcon={<SendIcon />}
          sx={{ width: "fit-content", marginLeft: "auto" }}
          //   onClick={() => setOpenDiscussionModal(true)}
        >
          Submit
        </Button>
      </StyledCommentForm>
    </Box>
  );
};
