import React from "react";

export const Table = ({ children }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = "" }) => {
  return <thead className={className}>{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

export const TableCell = ({ children, className = "" }) => {
  return <td className={className}>{children}</td>;
};
