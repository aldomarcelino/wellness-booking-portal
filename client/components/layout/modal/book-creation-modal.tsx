import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button, DateField, Select, TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import { X } from "lucide-react";

interface BookingProps {
  open: boolean;
  onClose: () => void;
  handleClick: () => void;
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

const BookingModal: React.FC<BookingProps> = ({
  open,
  onClose,
  handleClick,
}) => {
  // Handle create event form
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-revmove-image">
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
          Creat Event
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          Input form bewlow to request an event.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Event name"
            placeholder="aldo.marcelino@mailinator.com"
            width="100%"
          />

          <Box marginTop="24px">
            <Select
              label="Event type"
              placeholder="Select event type"
              data={[
                { id: "1", name: "Health Talk" },
                { id: "2", name: "Wellness Events" },
                { id: "3", name: "Fitness Activities" },
              ]}
              loading={false}
            />
          </Box>

          <DateField
            label="Date & Time"
            onChange={(e) => console.log(e, "<<")}
          />

          <Box marginTop="24px">
            <TextField
              label="Location"
              placeholder="Jl. Harbour Bay,  Kepulauan Riau 29444"
              width="100%"
            />
          </Box>

          <Box
            display="flex"
            gap="13px"
            justifyContent="center"
            marginTop="24px"
          >
            <Button
              label="Cancel"
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              onClick={handleClick}
              buttonType="secondary"
            />
            <Button
              label="Submit"
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              onClick={handleClick}
              submit
            />
          </Box>
        </form>
      </Component>
    </Modal>
  );
};

export default BookingModal;
