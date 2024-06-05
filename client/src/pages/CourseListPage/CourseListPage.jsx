import { Typography } from "@mui/material";
import { useUser } from "context/UserProvider/UserProvider";

export const CourseListPage = () => {
  const { user } = useUser();
  return (
    <>
      <Typography>Hello {user.firstName}</Typography>
    </>
  );
};
