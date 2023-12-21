import { ComponentProps } from "react";

export function TextInput({
  labelText,
  inputProps,
  placeholder,
}: {
  labelText: string;
  inputProps: ComponentProps<"input">;
  placeholder: string;
}) {
  return (
    <div className="input-wrap">
      <label htmlFor="name">{labelText} </label>
      <input type="text" placeholder={placeholder} {...inputProps} />
    </div>
  );
}
