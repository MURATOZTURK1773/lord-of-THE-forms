export const formatPhoneNumber = (phoneNumber: string) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`

  if (phoneNumber.length < 7) {
    console.error(`"${phoneNumber}" is an Invalid phone number`);
    return phoneNumber;
  }

  const formattedPhoneNumber =
    phoneNumber.substring(0, 2) +
    "-" +
    phoneNumber.substring(2, 4) +
    "-" +
    phoneNumber.substring(4, 6) +
    "-" +
    phoneNumber.substring(6);

  return formattedPhoneNumber;
};
