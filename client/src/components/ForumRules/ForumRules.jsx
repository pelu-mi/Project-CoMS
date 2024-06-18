import { Box, List, ListItem, Typography } from "@mui/material";
import { StyledRuleContainer } from "./ForumRules.styled";

const rules = [
  {
    title: "Respectful Communication",
    points: [
      "Maintain a respectful tone in all discussions",
      "Refrain from using offensive language, personal attacks, or any form of discrimination",
    ],
  },
  {
    title: "Relevance to Academic Topics",
    points: [
      "Keep discussions focused on the academic questions and programming problems provided by the instructors",
      "Avoid unrelated topics that do not contribute to the academic objectives of the forum",
    ],
  },
  {
    title: "Collaboration and Assistance",
    points: [
      "Encourage collaboration and helping each other in solving programming problems posted by the instructor",
      "Provide constructive feedback and explanations when assisting peers",
    ],
  },
  {
    title: "Originality and Integrity",
    points: [
      "Refrain from sharing solutions to graded assignments or exam questions",
      "Promote independent thinking and problem-solving skills rather than simply providing solutions",
    ],
  },
  {
    title: "Practice Only",
    points: [
      "Understand that the forum is designed solely for practice purposes",
      "No marks or grades will be awarded for participation in this forum",
    ],
  },
  {
    title: "Prioritization of Assignments and Exams",
    points: [
      "Acknowledge that the forum discussions are supplementary to graded assignments and exams",
      "Do NOT prioritize forum questions over completing graded assignments or preparing for exams",
    ],
  },
  {
    title: "Instructor's Guidance",
    points: [
      "Follow any additional instructions or guidelines provided by the instructor regarding the forum discussions",
    ],
  },
];

export const ForumRules = () => {
  return (
    <StyledRuleContainer>
      <Typography variant="h5">Rules</Typography>

      {rules.map(({ title, points }, index) => (
        <Box key={index} mt={2}>
          <Typography variant="h6">{title}</Typography>
          <List sx={{ listStyleType: "disc", paddingLeft: "24px" }}>
            {points.map((point, index) => (
              <ListItem
                sx={{ display: "list-item", padding: "4px 8px" }}
                key={`${index}-${point}`}
              >
                {point}
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </StyledRuleContainer>
  );
};
