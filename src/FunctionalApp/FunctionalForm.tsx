import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./FunctionalTextInput";
import { PhoneInput, PhoneInputState } from "./FunctionalPhoneInput";
import { isEmailValid, isPhoneValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

interface FunctionalAppProps {
  onFormSubmit: (userData: UserInformation) => void;
}

export const FunctionalForm: React.FC<FunctionalAppProps> = ({
  onFormSubmit,
}) => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setPhoneInputState(["", "", "", ""]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !isEmailValid(emailInput) ||
      !isPhoneValid(phoneInputState) ||
      !isValidCity(cityInput, allCities) ||
      firstNameInput.length < 2 ||
      lastNameInput.length < 2
    ) {
      const alertMessage = "bAd DATA InPuT";
      alert(alertMessage);
      setDisplayErrorMessage(true);
    } else {
      onFormSubmit({
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        city: cityInput,
        phone: formatPhoneNumber(phoneInputState.join("")),
      });
      setDisplayErrorMessage(false);
      resetForm();
    }
  };

  return (
    <div>
      <div className="alert"></div>
      <form onSubmit={handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <TextInput
          inputProps={{
            onChange: (e) => {
              setFirstNameInput(e.target.value);
            },
            value: firstNameInput,
          }}
          labelText="First Name:"
          placeholder="Bilbo"
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={displayErrorMessage && firstNameInput.length < 2}
        />

        <TextInput
          inputProps={{
            onChange: (e) => {
              setLastNameInput(e.target.value);
            },
            value: lastNameInput,
          }}
          labelText="Last Name:"
          placeholder="Baggins"
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={displayErrorMessage && lastNameInput.length < 2}
        />

        <TextInput
          inputProps={{
            onChange: (e) => {
              setEmailInput(e.target.value);
            },
            value: emailInput,
          }}
          labelText="EMAIL:"
          placeholder="bilbo@hobbiton-adventures.com"
        />
        <ErrorMessage
          message={emailErrorMessage}
          show={displayErrorMessage && !isEmailValid(emailInput)}
        />

        <div className="input-wrap">
          <label htmlFor="CITY:">CITY:</label>
          <input
            value={cityInput}
            type="text"
            list="cities"
            placeholder="HOBITON"
            onChange={(e) => setCityInput(e.target.value)}
          />
        </div>

        <ErrorMessage
          message={cityErrorMessage}
          show={displayErrorMessage && !isValidCity(cityInput, allCities)}
        />

        <PhoneInput
          inputProps={{
            onChange: () => {
              isPhoneValid(phoneInputState);
            },
            placeholder: "55",
          }}
          setPhoneInputState={setPhoneInputState}
          phoneInputState={phoneInputState}
        />

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={displayErrorMessage && !isPhoneValid(phoneInputState)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
