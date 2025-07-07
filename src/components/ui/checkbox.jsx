export const Checkbox = ({ checked, onCheckedChange, disabled }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    disabled={disabled}
  />
);
