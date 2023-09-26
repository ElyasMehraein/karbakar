const phoneNumberCheck = (phoneNumber) => {
  const phoneNumberRegex = /^09\d{1}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export default phoneNumberCheck;
//9