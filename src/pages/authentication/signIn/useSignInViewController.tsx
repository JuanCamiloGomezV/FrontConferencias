import { ChangeEvent, useEffect, useState } from "react";
import { SignInRequest } from "../../../model/request/SignInRequest";
import { useValidations } from "../../../utils/useValidations";

const useSignInViewController = () => {
  const [form, setForm] = useState({} as SignInRequest);
  const [disabledButton, setDisabledButton] = useState(true);
  const { validateEmail, validateLength } = useValidations();

  useEffect(() => {
    validateForm();
  }, [form]);

  const updateField = (
    type: keyof SignInRequest,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newForm = form;

    newForm[type] = event.target.value ?? "";
    setForm({ ...newForm });
  };

  const validateForm = () => {
    if (!validateEmail(form.usuario_correo)) return setDisabledButton(true);

    if (!validateLength(form.usuario_contrasena, 1))
      return setDisabledButton(true);

    return setDisabledButton(false);
  };

  return { updateField, form, disabledButton };
};

export default useSignInViewController;
