import PropTypes from "prop-types";
import { useUser } from "context";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledCard, StyledIconWrapper } from "./CommentCard.styled";
import { ROLES } from "constants/role";
import { CommentAvatar } from "./units/CommentAvatar";
import { ConfirmDeleteCommentModal } from "./components/ConfirmDeleteCommentModal";
import { useState } from "react";

export const CommentCard = ({ commentId, content, author, date, setComments }) => {
  const { user } = useUser();
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);

  const handleOnDelete = (event) => {
    event.stopPropagation();
    setOpenConfirmDeleteModal(true);
  };

  return (
    <>
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
          <Typography variant="body1">{content}</Typography>
        </Box>
      </StyledCard>

      <ConfirmDeleteCommentModal
        open={openConfirmDeleteModal}
        onClose={() => setOpenConfirmDeleteModal(false)}
        {...{ commentId, content, setComments }}
      />
    </>
  );
};

CommentCard.propTypes = {
  commentId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};
