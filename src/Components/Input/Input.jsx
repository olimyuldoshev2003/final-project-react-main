import { TextField } from "@mui/material";
import React from "react";

const Input = ({ typeInput, placeholderInput, value, onChangeValue }) => {
  return (
    <TextField
      type={typeInput}
      id="outlined-basic"
      label={placeholderInput}
      variant="outlined"
      value={value}
      onChange={onChangeValue}
      required
    />
  );
};

export default Input;
