import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledIconWrapper,
  StyledLinkText,
  StyledTypography,
} from "./CourseContentCard.styled";
import { Box, Link } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useUser } from "context";
import { ROLES } from "constants/role";

export const CourseContentCard = ({
  title,
  description,
  link,
  onClickEdit,
}) => {
  const { user } = useUser();

  return (
    <StyledCard elevation={0}>
      <Box width="100%" position="relative">
        {user.role === ROLES.instructor && (
          <StyledIconWrapper variant="outlined" onClick={onClickEdit}>
            <EditIcon color="primary" />
          </StyledIconWrapper>
        )}
      </Box>

      <StyledCardContent>
        <InsertDriveFileIcon
          color="primary"
          sx={{ width: "40px", height: "40px", marginBottom: "16px" }}
        />
        <StyledTypography
          mb={1}
          variant="body1"
          fontWeight={600}
          lineHeight={1.4}
        >
          <StyledLinkText href={link} target="_blank">
            {title}
          </StyledLinkText>
        </StyledTypography>
        <StyledTypography variant="body2" color="text.secondary">
          {description}
        </StyledTypography>
      </StyledCardContent>

      <Link href={link} target="_blank">
        <StyledButton variant="text">Open</StyledButton>
      </Link>
    </StyledCard>
  );
};

CourseContentCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  onClickEdit: PropTypes.func,
};
