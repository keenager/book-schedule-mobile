import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { toLocaleDate } from "../utils/date";

export const useDatePicker = (onChange: (newText: string) => void) => {
  const today = new Date();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(today);

  const onDateChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    setDate(selectedDate ?? today);
    const localeDate = toLocaleDate(selectedDate);
    onChange(localeDate);
  };
  return { show, setShow, date, onDateChange };
};
