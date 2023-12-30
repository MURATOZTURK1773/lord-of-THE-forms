import React, { ChangeEventHandler, ComponentProps, useRef } from "react";

export type PhoneInputState = [string, string, string, string];

interface PhoneInputProps {
  inputProps: ComponentProps<"input">;
  setPhoneInputState: (input: PhoneInputState) => void;
  phoneInputState: PhoneInputState;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  inputProps,
  setPhoneInputState,
  phoneInputState,
}) => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

  const refs = [ref0, ref1, ref2, ref3];

  const createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = (e.target as HTMLInputElement).value;

      const shouldGoToNextRef = currentMaxLength === value.length;
      const shouldGoToPrevRef = value.length === 0;

      if (/^\d*$/.test(value)) {
        const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? e.target.value : phoneInput
        ) as PhoneInputState;
        if (shouldGoToNextRef && nextRef) {
          nextRef.current?.focus();
        }
        setPhoneInputState(newState);
        if (shouldGoToPrevRef && prevRef) {
          prevRef.current?.focus();
        }
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          id="phone-input-wrap-1"
          type="text"
          {...inputProps}
          style={{
            display: "inline-flex",

            width: 20,
          }}
          ref={ref0}
          value={phoneInputState[0]}
          onChange={createOnChangeHandler(0)}
        />
        -
        <input
          id="phone-input-wrap-2"
          type="text"
          {...inputProps}
          style={{
            display: "inline-flex",

            width: 20,
          }}
          ref={ref1}
          value={phoneInputState[1]}
          onChange={createOnChangeHandler(1)}
        />
        -
        <input
          id="phone-input-wrap-3"
          type="text"
          {...inputProps}
          style={{
            width: 20,
            display: "inline-flex",
            flexDirection: "row",
          }}
          ref={ref2}
          value={phoneInputState[2]}
          onChange={createOnChangeHandler(2)}
        />
        -
        <input
          id="phone-input-wrap-4"
          type="text"
          {...inputProps}
          style={{
            display: "inflex",
            flexDirection: "row",
            width: 20,
          }}
          ref={ref3}
          maxLength={1}
          value={phoneInputState[3]}
          onChange={createOnChangeHandler(3)}
        />
      </div>
    </div>
  );
};
