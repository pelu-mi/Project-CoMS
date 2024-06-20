/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledAuthorContainer,
  StyledAvatar,
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledIconWrapper,
  StyledTypography,
} from "./DiscussionCard.styled";
import { useUser } from "context";
import { ROLES } from "constants/role";
import { useState } from "react";
import { ConfirmDeleteDiscussionModal } from "./components/ConfirmDeleteDiscussionModal";
import moment from "moment";

/**
 * Discussion Card
 */
export const DiscussionCard = ({
  discussionId,
  title,
  author,
  date,
  onClick,
}) => {
  const { user } = useUser();
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const handleOnDelete = (event) => {
    event.stopPropagation();
    setOpenConfirmDeleteModal(true);
  };

  return (
    <>
      <StyledCard elevation={0} {...{ onClick }}>
        <StyledCardActionArea disableRipple>
          <StyledCardContent>
            <Box display="flex" justifyContent="space-between" gap="8px">
              <StyledTypography variant="h5" fontWeight={600} lineHeight={1.4}>
                {title}
              </StyledTypography>

              {(user.role === ROLES.instructor || user._id === author._id) && (
                <StyledIconWrapper
                  variant="outlined"
                  onClick={handleOnDelete}
                  color="error"
                >
                  <DeleteIcon />
                </StyledIconWrapper>
              )}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="16px"
              justifyContent="space-between"
            >
              <StyledAuthorContainer>
                <StyledAvatar name={`${author.firstName} ${author.lastName}`} />
                <StyledTypography
                  variant="body1"
                  lineClamp={1}
                  sx={{ fontWeight: 500 }}
                >
                  {author.firstName} {author.lastName}
                </StyledTypography>
              </StyledAuthorContainer>
              <Typography variant="body2" color="text.secondary">
                {moment(date).fromNow()}
              </Typography>
            </Box>
          </StyledCardContent>
        </StyledCardActionArea>
      </StyledCard>
      <ConfirmDeleteDiscussionModal
        open={openConfirmDeleteModal}
        onClose={() => setOpenConfirmDeleteModal(false)}
        {...{ discussionId, discussionTitle: title }}
      />
    </>
  );
};

// Specify types of props to be received by the DiscussionCard
DiscussionCard.propTypes = {
  discussionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
