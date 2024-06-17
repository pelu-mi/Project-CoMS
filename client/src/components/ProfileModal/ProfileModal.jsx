/**
 * Import Modules
 */
import { useState } from "react";
import { Modal } from "components/Modal";
import PropTypes from "prop-types";
import { useUser } from "context";
import { ProfileInfo } from "./components/ProfileInfo";
import { EditProfile } from "./components/EditProfile";
import { Avatar } from "components/Avatar";
import { Box } from "@mui/material";

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
      title={
        isEditing ? (
          "Edit Profile"
        ) : (
          <Box
            display="flex"
            alignItems="center"
            gap="12px"
            textTransform="capitalize"
          >
            <Avatar name={`${user.firstName} ${user.lastName}`} />
            {user.firstName} {user.lastName}
          </Box>
        )
      }
      contentStyles={{ maxWidth: "450px" }}
      {...{ ...rest, onClose: handleClose }}
    >
      {!isEditing ? (
        <ProfileInfo onEdit={() => setIsEditing(true)} />
      ) : (
        <EditProfile
          onClose={() => handleClose()}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </Modal>
  );
};

// Specify types of props to be received by ProfileModal
ProfileModal.propTypes = {
  onClose: PropTypes.func,
};
