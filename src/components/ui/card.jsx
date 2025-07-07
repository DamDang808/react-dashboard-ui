import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`card mb-3 ${className}`}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
