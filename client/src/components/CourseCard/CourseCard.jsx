import { Box, CardContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardMedia,
  StyledIconWrapper,
  StyledTypography,
} from "./CourseCard.styled";
import { useUser } from "context";
import { ROLES } from "constants/role";
import { CourseModal } from "components/CourseModal";
import { useState } from "react";

export const CourseCard = ({
  image = "",
  courseId,
  name,
  description,
  onClick,
}) => {
  const { user } = useUser();
  const [openEditCourseModal, setOpenEditCourseModal] = useState(false);

  const handleOnEdit = (event) => {
    event.stopPropagation();
    setOpenEditCourseModal(true);
  };

  return (
    <>
      <StyledCard elevation={0} {...{ onClick }}>
        <StyledCardActionArea disableRipple>
          <Box width="100%" position="relative">
            <StyledCardMedia image={image} title={name} />

            {user.role === ROLES.instructor && (
              <StyledIconWrapper variant="outlined" onClick={handleOnEdit}>
                <EditIcon color="primary" />
              </StyledIconWrapper>
            )}
          </Box>

          <CardContent sx={{ width: "100%" }}>
            <StyledTypography
              mb={1}
              variant="body1"
              fontWeight={600}
              lineHeight={1.4}
            >
              {name}
            </StyledTypography>
            <StyledTypography variant="body2" color="text.secondary">
              {description}
            </StyledTypography>
          </CardContent>
        </StyledCardActionArea>
      </StyledCard>
      <CourseModal
        open={openEditCourseModal}
        onClose={() => setOpenEditCourseModal(false)}
        defaultValues={{
          courseId,
          name,
          description,
        }}
      />
    </>
  );
};

CourseCard.propTypes = {
  image: PropTypes.string,
  courseId: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
};
