import React from "react";

export const Checkbox = ({ checked, onCheckedChange, disabled }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onCheckedChange}
      disabled={disabled}
      className="form-check-input"
    />
  );
};