import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "../FunctionalApp/FunctionalTextInput";
import { PhoneInput, PhoneInputState } from "./ClassPhoneInput";
import { isEmailValid, isPhoneValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { SelectInput, Option } from "../FunctionalApp/FunctionalCityInput";
import { ProfileInformation } from "../ProfileInformation";
import { formatPhoneNumber } from "../utils/transformations";

interface ClassFormProps {}
interface ClassFormState {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  resetKey: string;
  phoneInputState: PhoneInputState;
  displayErrorMessage: boolean;
  joinedPhoneNumber: string;
  showAlert: boolean;
  formSubmittedSuccessfully: boolean;
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
  };
}

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<ClassFormProps, ClassFormState> {
  constructor(props: ClassFormProps) {
    super(props);

    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      resetKey: "initialKey",
      phoneInputState: ["", "", "", ""],
      displayErrorMessage: false,
      joinedPhoneNumber: "",
      showAlert: false,
      formSubmittedSuccessfully: false,
      userData: {
        email: "",
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
      },
    };
  }

  resetForm = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      resetKey: this.state.resetKey === "resetKey" ? "initialKey" : "resetKey",
      phoneInputState: ["", "", "", ""],
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !isEmailValid(this.state.emailInput) ||
      !isPhoneValid(this.state.phoneInputState) ||
      !isValidCity(this.state.cityInput, allCities) ||
      this.state.firstNameInput.length < 2 ||
      this.state.lastNameInput.length < 2
    ) {
      this.setState({
        formSubmittedSuccessfully: false,
        showAlert: true,
        displayErrorMessage: true,
      });

      const alertMessage = "bAd DATA InPuT";
      alert(alertMessage);
    } else {
      const userData = {
        email: this.state.emailInput,
        firstName: this.state.firstNameInput,
        lastName: this.state.lastNameInput,
        city: this.state.cityInput,
        phone: formatPhoneNumber(this.state.phoneInputState.join("")),
      };

      this.setState({
        userData,
        formSubmittedSuccessfully: true,
        displayErrorMessage: false,
      });

      this.resetForm();
    }
  };

  handleSetCityInput = (selectedOption: Option | null) => {
    this.setState({
      cityInput: selectedOption ? selectedOption.value : "",
    });
  };

  ErrorTracker = () => {
    const joinedPhoneNumber = this.state.phoneInputState.join("");
    console.log(joinedPhoneNumber);

    if (
      !isEmailValid(this.state.emailInput) ||
      !allCities.includes(this.state.cityInput) ||
      joinedPhoneNumber.length < 6
    ) {
      this.setState({
        displayErrorMessage: true,
      });
    } else {
      this.setState({
        displayErrorMessage: false,
      });
    }
  };

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      resetKey,
      phoneInputState,
      displayErrorMessage,
      joinedPhoneNumber,
      showAlert,
      formSubmittedSuccessfully,
      userData,
    } = this.state;

    const cities: Option[] = allCities.map((city) => ({
      value: city,
      label: city,
    }));

    return (
      <div>
        {formSubmittedSuccessfully ? (
          <ProfileInformation userData={userData} />
        ) : (
          <ProfileInformation userData={null} />
        )}

        {showAlert && <div className="alert"></div>}
        <form onSubmit={this.handleSubmit}>
          <u>
            <h3>User Information Form</h3>
          </u>

          <TextInput
            inputProps={{
              onChange: (e) => {
                this.setState({
                  firstNameInput: e.target.value,
                });
                this.ErrorTracker();
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
                this.setState({
                  lastNameInput: e.target.value,
                });
                this.ErrorTracker();
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
                this.setState({
                  emailInput: e.target.value,
                });
                this.ErrorTracker();
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
            onSelectChange={this.handleSetCityInput}
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
                this.ErrorTracker();
                isPhoneValid(phoneInputState);
              },
              placeholder: "55",
            }}
            setPhoneInputState={(newState) =>
              this.setState({ phoneInputState: newState })
            }
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
  }
}

export default ClassForm;
