/**
 * Import Modules
 */
import { useState } from "react";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useUser } from "context";
import { ProfileInfo } from "./components/ProfileInfo";
import { EditProfile } from "./components/EditProfile";

/**
 * Profile Modal
 */
export const ProfileModal = ({ onClose, ...rest }) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      title={isEditing ? "Edit Profile" : `${user.firstName} ${user.lastName}`}
      contentStyles={{ maxWidth: "450px" }}
      {...{ ...rest, onClose: handleClose }}
    >
      {!isEditing ? (
        <ProfileInfo onEdit={() => setIsEditing(true)} />
      ) : (
        <EditProfile onCancel={() => setIsEditing(false)} />
      )}
    </Modal>
  );
};

// Specify types of props to be received by ProfileModal
ProfileModal.propTypes = {
  onClose: PropTypes.func,
};
