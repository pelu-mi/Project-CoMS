import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import {
  StyledActionContainer,
  StyledDiscussionContainer,
  StyledEmptyLayout,
} from "./DiscussionListPage.styled";
import { DiscussionCard } from "components/DisucssionCard";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";
import { ForumRules } from "components/ForumRules";
import { useState } from "react";
import { DiscussionModal } from "components/DiscussionModal";
import { useDiscussionListQuery } from "services/api/forum/useDiscussionListQuery";
import { Loader } from "components/Loader";

export const DiscussionListPage = () => {
  const { courseId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDiscussionModal, setOpenDiscussionModal] = useState(false);

  const { courseName, discussions, isFetching } =
    useDiscussionListQuery(courseId);

  const renderAddDiscussionButton = () => {
    return (
      <Button
        className="add-discussion-step"
        startIcon={<AddIcon />}
        sx={{ minHeight: 56, flexGrow: 1 }}
        onClick={() => setOpenDiscussionModal(true)}
      >
        Add Discussion
      </Button>
    );
  };

  const renderDiscussions = () => {
    if (isFetching) {
      return (
        <StyledEmptyLayout>
          <Loader />
        </StyledEmptyLayout>
      );
    }

    if (discussions.length) {
      return (
        <Grid container spacing={2}>
          {discussions.map((discussion, index) => (
            <Grid item xs={12} key={`${index}-${discussion.title}`}>
              <DiscussionCard
                discussionId={discussion._id}
                title={discussion.title}
                author={{
                  authorId: discussion.creator,
                  firstName: discussion.firstName,
                  lastName: discussion.lastName,
                }}
                date={discussion.createdAt}
                onClick={() =>
                  navigate(
                    `${COURSE_LIST_ROUTE}/${courseId}${FORUM_LIST_ROUTE}/${discussion.forumId}`,
                    { state: { courseName: courseName } }
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
            No Discussion
          </Typography>
        </Box>
        {renderAddDiscussionButton()}
      </StyledEmptyLayout>
    );
  };

  return (
    <>
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
          <Typography color="text.primary" fontWeight={500}>
            Forum
          </Typography>
        </Breadcrumbs>

        <ForumRules />

        <Typography variant="h4" mt={4}>
          {courseName} Forum
        </Typography>

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
            {discussions.length} Discussion{discussions.length > 1 && "s"}
          </Typography>

          <StyledActionContainer>
            {/* <TextField
            placeholder="Search"
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.grey[400] }} />
                </InputAdornment>
              ),
            }}
          /> */}
            {renderAddDiscussionButton()}
          </StyledActionContainer>
        </Box>

        <StyledDiscussionContainer className="discussion-list-step">
          {renderDiscussions()}
        </StyledDiscussionContainer>
      </Box>

      <DiscussionModal
        open={openDiscussionModal}
        onClose={() => setOpenDiscussionModal(false)}
      />
    </>
  );
};
