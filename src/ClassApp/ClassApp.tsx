import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

interface ClassAppState {
  user: UserInformation | null;
}

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  state: ClassAppState = {
    user: null,
  };

  handleFormSubmit = (userData: UserInformation) => {
    this.setState({ user: userData });
  };

  render() {
    const { user } = this.state;

    return (
      <>
        <h2>Class Component</h2>
        <ProfileInformation userData={user} />
        <ClassForm onFormSubmit={this.handleFormSubmit} />
      </>
    );
  }
}

export default ClassApp;
