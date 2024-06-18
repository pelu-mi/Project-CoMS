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
import { useUser } from "context";
import { ROLES } from "constants/role";
import { DiscussionCard } from "components/DisucssionCard";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { COURSE_LIST_ROUTE, FORUM_LIST_ROUTE } from "routes";
import { ForumRules } from "components/ForumRules";
// import { Loader } from "components/Loader";

const discussions = [
  {
    title: "Module 1: Introduction to matematics",
    author: { _id: "123", firstName: "John", lastName: "Sam" },
    creationDate: "today",
    forumId: "123",
  },
  {
    title: "Module 2: Introduction to matematics",
    author: { _id: "123", firstName: "Ellen", lastName: "Krich" },
    creationDate: "today",
    forumId: "123",
  },
];

export const DiscussionListPage = () => {
  const { user } = useUser();
  const { courseId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName;

  const renderAddDiscussionButton = () => {
    if (user.role === ROLES.instructor)
      return (
        <Button
          className="add-discussion-step"
          startIcon={<AddIcon />}
          sx={{ minHeight: 56, flexGrow: 1 }}
          //   onClick={() => setOpenDiscussionModal(true)}
        >
          Add Discussion
        </Button>
      );
  };

  const renderDiscussions = () => {
    // if (isDiscussionFetching) {
    //   return (
    //     <StyledEmptyLayout>
    //       <Loader />
    //     </StyledEmptyLayout>
    //   );
    // }

    if (discussions.length) {
      return (
        <Grid container spacing={2}>
          {discussions.map((discussion, index) => (
            <Grid item xs={12} key={`${index}-${discussion.title}`}>
              <DiscussionCard
                title={discussion.title}
                author={discussion.author}
                date={discussion.creationDate}
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
        CS700 Forum
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
  );
};
