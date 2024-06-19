import PropTypes from "prop-types";
import { ConfirmModal } from "components/ConfirmModal";
import { useSnackbar } from "notistack";
import { useDeleteCommentMutation } from "services/api/forum/useDeleteCommentMutation";
import {
  StyledContent,
  StyledTypography,
} from "./ConfirmDeleteCommentModal.styled";

export const ConfirmDeleteCommentModal = ({
  commentId,
  content,
  setComments,
  onClose,
  ...rest
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: deleteComment } = useDeleteCommentMutation({
    onSuccess: async (data) => {
      // Filter new comments
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleOnConfirmDelete = async () => {
    console.log("commentId", commentId);
    await deleteComment({ commentId });
  };

  return (
    <ConfirmModal
      promptString={`Are you sure to delete comment?`}
      description={
        <StyledContent>
          <StyledTypography variant="body1" color="text.secondary">
            &quot;{content}&quot;
          </StyledTypography>
        </StyledContent>
      }
      confirmLabel="Delete"
      confirmColor="error"
      onClose={onClose}
      onConfirm={handleOnConfirmDelete}
      {...{ ...rest, onClose }}
    />
  );
};

// Specify types of props to be received by ConfirmDeleteCommentModal
ConfirmDeleteCommentModal.propTypes = {
  commentId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};
