// import { allCities } from "./all-cities";

import { PhoneInputState } from "../FunctionalApp/FunctionalPhoneInput";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isValidCity(city: string, allCities: string[]) {
  const lowerCaseCities = city.toLowerCase();
  const lowerCaseAllCities = allCities.map((c) => c.toLowerCase());

  return lowerCaseAllCities.includes(lowerCaseCities);
}

export function isPhoneValid(phoneNumber: PhoneInputState) {
  const regex = /^\d{2}-\d{2}-\d{2}-\d{1}$/;
  const joinedPhoneNumber = phoneNumber.join("-");

  return regex.test(joinedPhoneNumber);
}
