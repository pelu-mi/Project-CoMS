import QuestionMark from "@mui/icons-material/QuestionMark";
import { Fab, styled } from "@mui/material";

export const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  paddingRight: "16px",
  paddingLeft: "10px",
});

export const StyledQuestionMarkIcon = styled(QuestionMark)({
  marginRight: "4px",
  width: "20px",
  height: "20px",
});
