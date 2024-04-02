import { TextField } from "@mui/material";
import React from "react";

const Input = ({
  typeInput,
  placeholderInput,
  value,
  onChangeValue,
  onFocus,
  onBlur,
}) => {
  return (
    <TextField
      type={typeInput}
      id="outlined-basic"
      label={placeholderInput}
      variant="outlined"
      value={value}
      onChange={onChangeValue}
      onFocus={onFocus}
      onBlur={onBlur}
      required
    />
  );
};

export default Input;
