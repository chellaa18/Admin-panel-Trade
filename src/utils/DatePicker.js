import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatesPicker = ({selected, name, minDate, onDateChange }) => {
  return (
    <DatePicker
    name={name}
    selected={selected}
    className="p-3 m-1 mx-2 form-control"
    placeholderText={`select ${name}`}
    maxDate={new Date()}
    minDate={minDate}
    onChange={(date) => onDateChange(name, date)} 
  />
  );
};

export default DatesPicker;
