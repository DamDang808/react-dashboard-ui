export const Table = ({ children }) => (
  <table className="w-full border-collapse">{children}</table>
);

export const TableHeader = ({ children, className }) => (
  <thead className={className}>{children}</thead>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

export const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableCell = ({ children, className, ...props }) => (
  <td className={`border px-2 py-1 text-sm ${className}`} {...props}>
    {children}
  </td>
);
