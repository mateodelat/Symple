import { type SelectFieldProps } from "@/types";

export default function SelectField({
  name,
  register,
  options,
  props = {},
  className = "",
}: SelectFieldProps): JSX.Element {
  const isControlled = register !== undefined ? register(name) : {};

  return (
    <select id={name} {...props} {...isControlled} className={className}>
      {options?.map(({ id, label }) => {
        return (
          <option key={id} value={id}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
