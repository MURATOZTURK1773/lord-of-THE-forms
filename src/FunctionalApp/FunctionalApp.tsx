import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { UserInformation } from "../types";

export const FunctionalApp = () => {
  const [user, setUser] = useState<null | UserInformation>(null);

  const handleFormSubmit = (userData: UserInformation) => {
    setUser(userData);
  };
  return (
    <>
      <h2>Functional</h2>
      {user ? (
        <ProfileInformation userData={user} />
      ) : (
        <ProfileInformation userData={null} />
      )}
      <FunctionalForm onFormSubmit={handleFormSubmit} />
    </>
  );
};
