import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  render() {
    return (
      <>
        <h2>Class</h2>
        <ClassForm />
      </>
    );
  }
}
