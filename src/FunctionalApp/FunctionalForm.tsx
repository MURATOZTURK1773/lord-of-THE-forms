import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./FunctionalTextInput";
import { PhoneInput, PhoneInputState } from "./FunctionalPhoneInput";
import { isEmailValid, isPhoneValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { SelectInput, Option } from "./FunctionalCityInput";
import { ProfileInformation } from "../ProfileInformation";
import { formatPhoneNumber } from "../utils/transformations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [resetKey, setResetKey] = useState<string>("initialKey");
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const [joinedPhoneNumber, setJoinedPhoneNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] =
    useState(false);

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
  });

  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setResetKey((prevKey) =>
      prevKey === "resetKey" ? "initialKey" : "resetKey"
    );
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
      setFormSubmittedSuccessfully(false);
      const alertMessage = "bAd DATA InPuT";
      alert(alertMessage);
      setShowAlert(true);
      setDisplayErrorMessage(true);
    } else {
      setUserData({
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        city: cityInput,
        phone: formatPhoneNumber(phoneInputState.join("")),
      });
      setFormSubmittedSuccessfully(true);
      setDisplayErrorMessage(false);
      resetForm();
    }
  };

  const handleSetCityInput = (selectedOption: Option | null) => {
    setCityInput(selectedOption ? selectedOption.value : "");
  };

  const cities: Option[] = allCities.map((city) => ({
    value: city,
    label: city,
  }));

  function ErrorTracker() {
    const joinedPhoneNumber = phoneInputState.join("");
    setJoinedPhoneNumber(joinedPhoneNumber);
    console.log(joinedPhoneNumber);

    if (
      !isEmailValid(emailInput) ||
      !allCities.includes(cityInput) ||
      joinedPhoneNumber.length < 6
    ) {
      setDisplayErrorMessage(true);
    } else {
      setDisplayErrorMessage(false);
    }
  }

  return (
    <div>
      {formSubmittedSuccessfully && <ProfileInformation userData={userData} />}

      {showAlert && <div className="alert"></div>}
      <form onSubmit={handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        <TextInput
          inputProps={{
            onChange: (e) => {
              setFirstNameInput(e.target.value);
              ErrorTracker();
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
              ErrorTracker();
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
              ErrorTracker();
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

        <SelectInput
          options={cities}
          onSelectChange={handleSetCityInput}
          selectedValue={cityInput}
          labelText="CITY:"
          placeholder="Hobiton"
          resetKey={resetKey}
        />

        <ErrorMessage
          message={cityErrorMessage}
          show={displayErrorMessage && !isValidCity(cityInput, allCities)}
        />

        <PhoneInput
          inputProps={{
            onChange: () => {
              ErrorTracker();
              isPhoneValid(phoneInputState);
            },
            placeholder: "55",
          }}
          setPhoneInputState={setPhoneInputState}
          phoneInputState={phoneInputState}
        />

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={
            displayErrorMessage &&
            !isPhoneValid(phoneInputState) &&
            joinedPhoneNumber.length < 6
          }
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
