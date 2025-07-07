import React from "react";

export const Button = ({ children, onClick, disabled, size = "md" }) => {
  const sizeClass = size === "sm" ? "btn-sm" : "btn-md";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary ${sizeClass}`}
    >
      {children}
    </button>
  );
};

