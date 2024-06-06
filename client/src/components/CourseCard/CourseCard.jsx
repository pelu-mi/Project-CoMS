import { Box, CardActionArea, CardContent, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import {
  StyledCard,
  StyledCardMedia,
  StyledIconWrapper,
} from "./CourseCard.styled";
import { useUser } from "context";
import { ROLES } from "constants/role";

export const CourseCard = ({ image = "", title, description, onClickEdit }) => {
  const { user } = useUser();
  return (
    <StyledCard elevation={0}>
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
        disableRipple
      >
        <Box width="100%" position="relative">
          <StyledCardMedia image={image} title={title} />

          {user.role === ROLES.instructor && (
            <StyledIconWrapper variant="outlined" onClick={onClickEdit}>
              <EditIcon color="primary" />
            </StyledIconWrapper>
          )}
        </Box>

        <CardContent sx={{ width: "100%" }}>
          <Typography
            mb={1}
            variant="body1"
            fontWeight={600}
            lineHeight={1.4}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

CourseCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onClickEdit: PropTypes.func,
};
