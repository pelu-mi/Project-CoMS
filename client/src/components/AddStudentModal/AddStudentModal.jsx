/**
 * Import Modules
 */
import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  StyledAlert,
  StyledListItem,
  StyledRegisteredList,
} from "./AddStudentModal.styled";
import { useAddStudentsMutation } from "services/api/courseDetail/useAddStudentsMutation";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { GET_REGISTERED_STUDENTS_API_KEY } from "services/constants";
import { useRegisteredStudentsQuery } from "services/api/courseDetail/useRegisteredStudentsQuery";
import { useStudentsQuery } from "services/api/courseDetail/useStudentsQuery";
import { sortByKey } from "utils/sortByKey";
import { stringAvatar } from "utils/stringAvatar";
import { detectStudentChanges } from "utils/detectStudentChanges";
import { ConfirmDiscardModal } from "./units/ConfirmDiscardModal";

/**
 * Add Student Modal
 */
export const AddStudentModal = ({ onClose, ...rest }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const { students } = useStudentsQuery();
  const { registeredStudents } = useRegisteredStudentsQuery(courseId);
  const [registeredStudentsState, setRegisteredStudentsState] =
    useState(registeredStudents);
  const [studentChanges, setStudentChanges] = useState({});
  const [showConfirmDiscardModal, setShowConfirmDiscardModal] = useState(false);

  // Handle success and error when adding students
  const { mutateAsync: addStudents } = useAddStudentsMutation({
    onSuccess: async (data) => {
      enqueueSnackbar(data.message, { variant: "success" });
      onClose();
      await queryClient.invalidateQueries(
        `${GET_REGISTERED_STUDENTS_API_KEY}/${courseId}`
      );
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const handleSetStudents = async () => {
    const studentIds = registeredStudentsState.map((student) => student._id);

    const payload = {
      courseId,
      studentIds,
    };

    await addStudents(payload);
  };

  const handleDiscard = () => {
    setShowConfirmDiscardModal(false);
    onClose();
    setRegisteredStudentsState(registeredStudents);
  };

  const handleClose = () => {
    if (studentChanges.added > 0 || studentChanges.removed > 0) {
      setShowConfirmDiscardModal(true);
      return;
    }
    handleDiscard();
  };

  useEffect(() => {
    setRegisteredStudentsState(registeredStudents);
  }, [registeredStudents]);

  useEffect(() => {
    const detectChanges = detectStudentChanges(
      registeredStudents,
      registeredStudentsState
    );
    setStudentChanges(detectChanges);
  }, [registeredStudents, registeredStudentsState]);

  return (
    <>
      <Modal
        title="Add/Remove Students"
        aria-labelledby="set-student-form"
        aria-describedby="set-student-form"
        {...{ ...rest, onClose: () => handleClose() }}
      >
        <Grid container mt={4} gap={3}>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={sortByKey(students, "firstName")}
            disableCloseOnSelect
            disableClearable
            fullWidth
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            renderOption={(props, option) => (
              <ListItem {...props} value={option._id} key={option._id}>
                <Avatar
                  src="/.jpg"
                  {...stringAvatar(`${option.firstName} ${option.lastName}`)}
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
            value={registeredStudentsState}
            onChange={(event, newValue) => {
              setRegisteredStudentsState(newValue);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                // Prevent's default 'Enter' behavior.
                event.defaultMuiPrevented = true;
              }
            }}
            renderTags={() => null}
            isOptionEqualToValue={(option, value) => option._id === value._id}
          />
          <Grid item xs={12}>
            <Typography variant="body1" mb={1}>
              Students in this class{" "}
              {registeredStudentsState.length > 0 &&
                `(${registeredStudentsState.length})`}
            </Typography>
            <StyledRegisteredList>
              {sortByKey(registeredStudentsState, "firstName").map(
                (student, index) => (
                  <StyledListItem key={index}>
                    <ListItemIcon value={student._id}>
                      <Avatar
                        src="/.jpg"
                        {...stringAvatar(
                          `${student.firstName} ${student.lastName}`
                        )}
                      />
                    </ListItemIcon>
                    <Typography mr="auto">
                      {student.firstName} {student.lastName}
                    </Typography>
                    <IconButton color="error">
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        color="error"
                        onClick={() => {
                          setRegisteredStudentsState((prev) =>
                            prev.filter(({ _id }) => _id !== student._id)
                          );
                        }}
                      />
                    </IconButton>
                  </StyledListItem>
                )
              )}
            </StyledRegisteredList>

            {studentChanges.added > 0 && (
              <StyledAlert severity="info">
                Adding <strong>{studentChanges.added}</strong> new student
                {studentChanges.added !== 1 && "s"}
              </StyledAlert>
            )}

            {studentChanges.removed > 0 && (
              <StyledAlert severity="warning">
                Removing <strong>{studentChanges.removed}</strong> previous
                student
                {studentChanges.removed !== 1 && "s"}
              </StyledAlert>
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={6} sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                disableRipple
                onClick={handleClose}
                sx={{ height: "100%" }}
              >
                {studentChanges.added > 0 || studentChanges.removed > 0
                  ? "Discard Changes"
                  : "Close"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                sx={{ height: "100%" }}
                fullWidth
                onClick={handleSetStudents}
              >
                Save Students
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>

      <ConfirmDiscardModal
        open={showConfirmDiscardModal}
        onClose={() => setShowConfirmDiscardModal(false)}
        onDiscard={handleDiscard}
      />
    </>
  );
};

// Specify types of props to be received by AddStudentModal
AddStudentModal.propTypes = {
  onClose: PropTypes.func,
};
