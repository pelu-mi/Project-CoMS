import PropTypes from "prop-types";
import { ConfirmModal } from "components/ConfirmModal";
import { useDeleteDiscussionMutation } from "services/api/forum/useDeleteDiscussionMutation";
import { useSnackbar } from "notistack";
import { GET_DISCUSSIONS_API_KEY } from "services/constants";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  StyledContent,
  StyledTypography,
} from "components/CommentCard/components/ConfirmDeleteCommentModal/ConfirmDeleteCommentModal.styled";

export const ConfirmDeleteDiscussionModal = ({
  discussionId,
  discussionTitle,
  onClose,
  ...rest
}) => {
  const { courseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteDiscussion } = useDeleteDiscussionMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      await queryClient.invalidateQueries(
        `${GET_DISCUSSIONS_API_KEY}/${courseId}`
      );
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleOnConfirmDelete = async () => {
    await deleteDiscussion({ discussionId });
  };

  return (
    <ConfirmModal
      promptString={`Are you sure to delete discussion?`}
      description={
        <StyledContent>
          <StyledTypography variant="body1" color="text.secondary">
            &quot;{discussionTitle}&quot;
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

// Specify types of props to be received by ConfirmDeleteDiscussionModal
ConfirmDeleteDiscussionModal.propTypes = {
  discussionId: PropTypes.string.isRequired,
  discussionTitle: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
