export const detectStudentChanges = (prevArray, newArray) => {
  const prevIds = prevArray.map((student) => student._id);
  const newIds = newArray.map((student) => student._id);

  const addedStudents = newArray.filter(
    (student) => !prevIds.includes(student._id)
  );
  const removedStudents = prevArray.filter(
    (student) => !newIds.includes(student._id)
  );

  return {
    added: addedStudents.length,
    removed: removedStudents.length,
  };
};
