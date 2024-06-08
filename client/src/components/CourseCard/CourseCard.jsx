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

export const CourseCard = ({
  image = "",
  title,
  description,
  onClick,
  onClickEdit,
}) => {
  const { user } = useUser();
  return (
    <StyledCard elevation={0} {...{ onClick }}>
      <StyledCardActionArea disableRipple>
        <Box width="100%" position="relative">
          <StyledCardMedia image={image} title={title} />

          {user.role === ROLES.instructor && (
            <StyledIconWrapper variant="outlined" onClick={onClickEdit}>
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
            {title}
          </StyledTypography>
          <StyledTypography variant="body2" color="text.secondary">
            {description}
          </StyledTypography>
        </CardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

CourseCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  onClickEdit: PropTypes.func,
};
