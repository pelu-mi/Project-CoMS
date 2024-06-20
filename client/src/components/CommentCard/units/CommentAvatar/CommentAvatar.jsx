/**
 * Import Modules
 */
import PropTypes from "prop-types";
import { Box, Tooltip, Typography } from "@mui/material";
import {
  StyledAuthorContainer,
  StyledAvatar,
  StyledTypography,
} from "components/CommentCard/CommentCard.styled";
import moment from "moment";

/**
 * Comment Avatar
 */
export const CommentAvatar = ({ author, date }) => {
  return (
    <StyledAuthorContainer>
      <StyledAvatar name={`${author.firstName} ${author.lastName}`} />
      <Box>
        <Tooltip title={`${author.firstName} ${author.lastName}`}>
          <StyledTypography variant="body1">
            {author.firstName} {author.lastName}
          </StyledTypography>
        </Tooltip>

        {date && (
          <Typography variant="body2" color="text.secondary">
            {moment(date).fromNow()}
          </Typography>
        )}
      </Box>
    </StyledAuthorContainer>
  );
};

// Specify types of props to be received by the CommentAvatar
CommentAvatar.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};
