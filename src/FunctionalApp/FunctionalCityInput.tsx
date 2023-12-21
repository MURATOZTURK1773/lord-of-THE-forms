import Select, { SingleValue } from "react-select";

import { useEffect, useRef } from "react";
export interface Option {
  value: string;
  label: string;
}

interface SelectedInputProps {
  options: Option[];
  onSelectChange: (selectedOption: Option | null) => void;
  selectedValue: string;
  labelText: string;
  placeholder: string;
  resetKey: string;
}

export const SelectInput: React.FC<SelectedInputProps> = ({
  options,
  onSelectChange,
  selectedValue,
  labelText,
  placeholder,
  resetKey,
}) => {
  const selectRef = useRef<Select<Option> | null>(null);

  useEffect(() => {
    if (
      selectRef.current &&
      selectRef.current.select &&
      selectRef.current.select.clearValue
    ) {
      selectRef.current.select.clearValue();
    }
  }, [resetKey]);

  return (
    <div className="input-wrap">
      <label>{labelText}</label>
      <Select<Option>
        ref={selectRef}
        options={options}
        onChange={(selectedOption: SingleValue<Option>) => {
          onSelectChange(selectedOption as Option | null);
        }}
        value={options.find((option) => option.value === selectedValue)}
        placeholder={placeholder}
        key={resetKey}
      />
    </div>
  );
};
