type Severity = 'success' | 'error' | 'warning' | 'info';

let showSnackbar: (message: string, severity: Severity) => void = () => {};

export const setSnackbar = (callback: (message: string, severity: Severity) => void): void => {
  showSnackbar = callback;
};

export const triggerSnackbar = (message: string, severity: Severity): void => {
  showSnackbar(message, severity);
}; 