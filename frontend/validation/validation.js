const phoneNumberCheck = (phoneNumber) => {
  const phoneNumberRegex = /^09\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export default phoneNumberCheck;
