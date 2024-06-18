import PropTypes from "prop-types";
import { useUser } from "context";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledCard, StyledIconWrapper } from "./CommentCard.styled";
import { ROLES } from "constants/role";
import { CommentAvatar } from "./units/CommentAvatar";

export const CommentCard = ({ comment, author, date }) => {
  const { user } = useUser();

  const handleOnDelete = (event) => {
    event.stopPropagation();
    // setOpenConfirmDeleteModal(true);
  };

  return (
    <StyledCard elevation={0}>
      <Box display="flex" justifyContent="space-between" gap="8px">
        <CommentAvatar {...{ author, date }} />

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
        <Typography variant="body1">{comment}</Typography>
      </Box>
    </StyledCard>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};
