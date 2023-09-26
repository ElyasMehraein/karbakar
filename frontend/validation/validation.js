export const phoneNumberCheck = (phoneNumber) => {
  const phoneNumberRegex = /^09\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};
export const codeCheck = (smscode) => {
  console.log("oss");
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(smscode);
};

