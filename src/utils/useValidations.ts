export const useValidations = () => {
  const validateEmail = (email: string) => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validateLength = (
    value: string | undefined,
    minLength = 2,
    maxLength = 100
  ) => {
    if (!value) return false;
    if (value.length >= minLength && value.length <= maxLength) return true;
    else return false;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword;
  };

  return { validateEmail, validateLength, validateConfirmPassword };
};
