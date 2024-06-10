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
import { UploadContentModal } from "components/UploadContentModal";
import { useState } from "react";

export const CourseContentCard = ({ courseId, title, description, link }) => {
  const { user } = useUser();
  const [openEditContentModal, setOpenEditContentModal] = useState(false);

  return (
    <>
      <StyledCard elevation={0}>
        <Box width="100%" position="relative">
          {user.role === ROLES.instructor && (
            <StyledIconWrapper
              variant="outlined"
              onClick={() => setOpenEditContentModal(true)}
            >
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
      <UploadContentModal
        open={openEditContentModal}
        onClose={() => setOpenEditContentModal(false)}
        defaultValues={{
          courseId,
          title,
          description,
          link,
        }}
      />
    </>
  );
};

CourseContentCard.propTypes = {
  courseId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
