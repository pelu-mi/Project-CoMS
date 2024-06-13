/**
 * detectStudentChanges - Detect changes to registered students and get the lengths
 */
export const detectStudentChanges = (prevArray, newArray) => {
  const prevIds = prevArray.map((student) => student._id);
  const newIds = newArray.map((student) => student._id);

  // Get list of added students
  const addedStudents = newArray.filter(
    (student) => !prevIds.includes(student._id)
  );
  // Get list of removed students
  const removedStudents = prevArray.filter(
    (student) => !newIds.includes(student._id)
  );

  return {
    added: addedStudents.length,
    removed: removedStudents.length,
  };
};
