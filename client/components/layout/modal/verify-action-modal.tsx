import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import { X } from "lucide-react";

interface BookingProps {
  open: boolean;
  onClose: () => void;
  handleClick: () => void;
  actionType: string;
}

const Component = styled(Box)(
  ({ width, padding }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${width};
  background-color: ${Colors.white};
  box-shadow: 0px 10px 40px rgba(164, 149, 107, 0.1);
  padding: ${padding};
  border-radius: 40px;
  outline: none;
`
);

const VerificationModal: React.FC<BookingProps> = ({
  open,
  onClose,
  handleClick,
  actionType,
}) => {
  // Handle create event form
  const handleSubmit = () => {};

  const handleShowButton = () => {
    let bgColor = Colors.gery100;
    const value = actionType && actionType.toLocaleLowerCase();
    switch (value) {
      case "reject":
        bgColor = Colors.red100;
        break;

      case "approve":
        bgColor = Colors.green100;
        break;

      default:
        bgColor = Colors.gery100;
        break;
    }

    return (
      <Box
        display="flex"
        padding="13px"
        justifyContent="center"
        borderRadius="11px"
        width="100%"
        sx={{
          backgroundColor: bgColor,
          color: Colors.white,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        {actionType}
      </Box>
    );
  };

  return (
    <Modal open={open} aria-labelledby="modal-revmove-image">
      <Component width="544px" padding="32px">
        <Box position="relative">
          <Box
            position="absolute"
            right="0"
            top="0"
            zIndex="1"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          >
            <X size={24} />
          </Box>
        </Box>

        <Typography variant="h3" fontWeight={600} fontSize="32px">
          Are You Sure ?
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          {`By click the button below  you will '${actionType}' this event.`}
        </Typography>
        {actionType === "Reject" && (
          <TextField
            label="Rejected Reason"
            placeholder="The event's date collides with shceduled event."
            width="100%"
          />
        )}

        <Box justifyContent="center" marginTop="24px">
          {handleShowButton()}
        </Box>
      </Component>
    </Modal>
  );
};

export default VerificationModal;
