import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "components/elements";
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

        <Typography variant="h1" marginBottom="32px">
          Jd;klafjsldj
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          Mfklajsdlfjasd
        </Typography>

        <Button
          label="Berikan ini"
          padding="16px 32px"
          borderRadius="20px"
          fontSize="18px"
          onClick={handleClick}
        />
      </Component>
    </Modal>
  );
};

export default BookingModal;
