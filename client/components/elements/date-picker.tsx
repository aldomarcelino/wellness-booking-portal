import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Colors } from "styles/theme/color";

interface DateFieldProps {
  inputFormat?: string;
  label?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

const DateField: React.FC<DateFieldProps> = React.memo(
  ({ inputFormat = "dd/MM/yyyy", label, value = new Date(), onChange }) => {
    const today = dayjs().subtract(0, "day");

    const [val, setVal] = useState<Date | null>(value);

    const handleChange = useCallback(
      (newValue: Date | null) => {
        setVal(newValue);
        onChange(newValue);
      },
      [onChange]
    );

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DemoItem
            label={label}
            sx={{ color: Colors.darkGrey, marginTop: "10px" }}
          >
            <DateTimePicker
              defaultValue={today}
              views={["year", "month", "day", "hours", "minutes"]}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    );
  }
);

export default DateField;
