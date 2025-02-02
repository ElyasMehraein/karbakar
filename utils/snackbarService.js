let showSnackbar = () => {};

export const setSnackbar = (callback) => {
  showSnackbar = callback;
};

export const triggerSnackbar = (message, severity) => {
  showSnackbar(message, severity);
};
