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

  const validities = {
    firstName: firstNameInput.length < 2,
    lastName: lastNameInput.length < 2,
    email: isEmailValid(emailInput),
    city: isValidCity(cityInput, allCities),
    phone: isPhoneValid(phoneInputState),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validities.email ||
      !isPhoneValid(phoneInputState) ||
      !isValidCity(cityInput, allCities) ||
      validities.firstName ||
      validities.lastName
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
          show={displayErrorMessage && validities.firstName}
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
          show={displayErrorMessage && validities.lastName}
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
          show={displayErrorMessage && !validities.email}
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
          show={displayErrorMessage && !validities.city}
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
          show={displayErrorMessage && !validities.phone}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
