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

export class ClassForm extends Component<ClassAppProps, ClassFormState> {
  constructor(props: ClassAppProps) {
    super(props);

    this.state = {
      firstNameInput: "",
      lastNameInput: "",
      emailInput: "",
      cityInput: "",
      phoneInputState: ["", "", "", ""],
      displayErrorMessage: false,
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
        userData,
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
            show={displayErrorMessage && firstNameInput.length < 2}
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
            show={displayErrorMessage && lastNameInput.length < 2}
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
            show={displayErrorMessage && !isEmailValid(emailInput)}
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
            show={displayErrorMessage && !isValidCity(cityInput, allCities)}
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
            show={displayErrorMessage && !isPhoneValid(phoneInputState)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ClassForm;
