import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Button, DateField, Select, TextField } from "components/elements";
import { Colors } from "styles/theme/color";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import useSWR from "swr";

interface BookingProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
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

const BookingModal: React.FC<BookingProps> = ({ open, onClose, refetch }) => {
  // Initialize State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
  });
  const [eventDate, setEventDate] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );

  // Fetch List Types
  const { data } = useSWR(() => "/api/types");

  // Event on change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Clear state handler
  const handleCancel = () => {
    setForm({
      name: "",
      type: "",
      location: "",
    });
    setEventDate(null);
    setError("");
    setLoading(false);
    onClose();
  };

  // Handle create event form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = {
        name: form.name,
        type: form.type,
        event_date: eventDate,
        location: form.location,
        status: "Pending Review",
      };

      const response = await axios.post("/api/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status) {
        setLoading(false);
        refetch();
        handleCancel();
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.response && e.response.data && e.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-event-creation"
    >
      <Component width="544px" padding="32px">
        <Typography variant="h3" fontWeight={600} fontSize="32px">
          Creat Event
        </Typography>
        <Typography variant="body2" marginBottom="40px">
          Input form bewlow to request an event.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Event name"
            name="name"
            value={form.name}
            handleChange={handleChange}
            placeholder="July Healthy Fair"
            width="100%"
          />

          <Box margin="24px 0px 20px">
            <Select
              name="type"
              value={form.type}
              label="Event type"
              handleChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="Select event type"
              data={data}
              loading={false}
              returnValue="name"
            />
          </Box>

          <DateField
            label="Date & Time"
            value={eventDate}
            onChange={(newValue: Dayjs | null) => setEventDate(newValue)}
          />

          <Box marginTop="24px">
            <TextField
              name="location"
              value={form.location}
              handleChange={handleChange}
              label="Location"
              placeholder="Jl. Harbour Bay,  Kepulauan Riau 29444"
              width="100%"
            />
          </Box>

          <Typography
            variant="body2"
            color={Colors.red100}
            marginBottom="8px"
            textAlign="center"
          >
            {error}
          </Typography>

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
              onClick={handleCancel}
              buttonType="secondary"
            />
            <Button
              label={loading ? "Loading..." : "Submit"}
              padding="13px 32px"
              borderRadius="20px"
              fontSize="18px"
              disabled={loading}
              submit
            />
          </Box>
        </form>
      </Component>
    </Modal>
  );
};

export default BookingModal;
