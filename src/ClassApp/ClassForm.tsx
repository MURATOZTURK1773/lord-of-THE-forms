import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "../FunctionalApp/FunctionalTextInput";
import { PhoneInput, PhoneInputState } from "./ClassPhoneInput";
import { isEmailValid, isPhoneValid, isValidCity } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { UserInformation } from "../types";
import { formatPhoneNumber } from "../utils/transformations";

interface ClassAppProps {
  onFormSubmit: (userData: UserInformation) => void;
}
interface ClassFormState {
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;
  cityInput: string;
  phoneInputState: PhoneInputState;
  displayErrorMessage: boolean;
}

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<ClassAppProps, ClassFormState> {
  state: ClassFormState = {
    firstNameInput: "",
    lastNameInput: "",
    emailInput: "",
    cityInput: "",
    phoneInputState: ["", "", "", ""],
    displayErrorMessage: false,
  };

  validities = {
    firstName: this.state.firstNameInput.length < 2,
    lastName: this.state.lastNameInput.length < 2,
    email: isEmailValid(this.state.emailInput),
    city: isValidCity(this.state.cityInput, allCities),
    phone: isPhoneValid(this.state.phoneInputState),
  };

  resetForm = () => {
    this.setState({
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.validities = {
      firstName: this.state.firstNameInput.length < 2,
      lastName: this.state.lastNameInput.length < 2,
      email: isEmailValid(this.state.emailInput),
      city: isValidCity(this.state.cityInput, allCities),
      phone: isPhoneValid(this.state.phoneInputState),
    };

    if (
      !this.validities.email ||
      !this.validities.phone ||
      !this.validities.city ||
      this.validities.firstName ||
      this.validities.lastName
    ) {
      this.setState({
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

      this.props.onFormSubmit(userData);

      this.setState({
        displayErrorMessage: false,
      });
      this.resetForm();
    }
  };

  render() {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      cityInput,
      phoneInputState,
      displayErrorMessage,
    } = this.state;

    const validities = {
      firstName: firstNameInput.length < 2,
      lastName: lastNameInput.length < 2,
      email: isEmailValid(emailInput),
      city: isValidCity(cityInput, allCities),
      phone: isPhoneValid(phoneInputState),
    };

    return (
      <div>
        <div className="alert"></div>
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
                this.setState({
                  lastNameInput: e.target.value,
                });
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
                this.setState({
                  emailInput: e.target.value,
                });
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
              onChange={(e) => this.setState({ cityInput: e.target.value })}
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
            setPhoneInputState={(newState) =>
              this.setState({ phoneInputState: newState })
            }
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
  }
}

export default ClassForm;
