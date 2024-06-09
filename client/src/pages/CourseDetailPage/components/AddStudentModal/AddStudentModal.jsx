import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useState } from "react";
import { StyledListItem, StyledRegisteredList } from "./AddStudentModal.styled";

export const AddStudentModal = ({ onClose, ...res }) => {
  // TODO: Get all students for list
  const [registerdStudents, setRegisterdStudents] = useState([
    {
      firstName: "George",
      lastName: "Smith",
      id: 6,
    },
    {
      firstName: "Fillip",
      lastName: "Hahs",
      id: 7,
    },
  ]);

  return (
    <Modal
      title="Students"
      aria-labelledby="add-student-form"
      aria-describedby="add-student-form"
      {...{ ...res, onClose }}
    >
      <Grid container mt={4} gap={3}>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={students}
          disableCloseOnSelect
          disableClearable
          fullWidth
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderOption={(props, option) => (
            <ListItem {...props} value={option.id} key={option.id}>
              <Avatar
                alt={`${option.firstName} ${option.lastName}src="/.jpg"`}
                src="/.jpg"
              />
              <Typography ml="14px">
                {option.firstName} {option.lastName}
              </Typography>
            </ListItem>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search student to register"
              placeholder="Search by Student Name"
            />
          )}
          value={registerdStudents}
          onChange={(event, newValue) => {
            setRegisterdStudents(newValue);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // Prevent's default 'Enter' behavior.
              event.defaultMuiPrevented = true;
            }
          }}
          renderTags={() => null}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        <Grid item xs={12}>
          <Typography variant="body1" mb={1}>
            Registered Students{" "}
            {registerdStudents.length > 0 && `(${registerdStudents.length})`}
          </Typography>
          <StyledRegisteredList>
            {registerdStudents
              .sort((a, b) => ("" + a.firstName).localeCompare(b.firstName))
              .map((student, index) => (
                <StyledListItem key={index}>
                  <ListItemIcon value={student.id}>
                    <Avatar
                      alt={`${student.firstName} ${student.lastName}src="/.jpg"`}
                      src="/.jpg"
                    />
                  </ListItemIcon>
                  <Typography mr="auto">
                    {student.firstName} {student.lastName}
                  </Typography>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    color="error"
                    onClick={() => {
                      setRegisterdStudents((prev) =>
                        prev.filter(({ id }) => id !== student.id)
                      );
                    }}
                  />
                </StyledListItem>
              ))}
          </StyledRegisteredList>
        </Grid>
        <Grid container spacing={2}>
          <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disableRipple
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* TODO: Connect add students endpoint */}
            <Button sx={{ height: "100%" }} fullWidth onClick={() => {}}>
              Save Students
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

AddStudentModal.propTypes = {
  onClose: PropTypes.func,
};

const students = [
  {
    firstName: "John",
    lastName: "Smith",
    id: 1,
  },
  {
    firstName: "James",
    lastName: "Smith",
    id: 2,
  },
  {
    firstName: "James",
    lastName: "Smith",
    id: 3,
  },
  {
    firstName: "James",
    lastName: "Andrew",
    id: 4,
  },
  {
    firstName: "Joe",
    lastName: "Smith",
    id: 5,
  },
  {
    firstName: "George",
    lastName: "Smith",
    id: 6,
  },
  {
    firstName: "Fillip",
    lastName: "Hahs",
    id: 7,
  },
];
