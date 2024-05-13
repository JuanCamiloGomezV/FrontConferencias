import { SelectChangeEvent } from "@mui/material";
import { SignUpRequest } from "../../../model/request/SignUpRequest";
import { useValidations } from "../../../utils/useValidations";
import { ChangeEvent, useEffect, useState } from "react";

export const useSignUpViewController = () => {
  const [form, setForm] = useState<SignUpRequest>({
    email: "",
    identification: "",
    institutionId: "",
    name: "",
    password: "",
    roleId: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);

  const { validateEmail, validateLength, validateConfirmPassword } =
    useValidations();

  useEffect(() => {
    const newForm = form;
    newForm.roleId = "3";
    setForm(newForm);
  }, []);

  useEffect(() => {
    validateForm();
  }, [form, passwordConfirm]);

  const updateField = (
    type: keyof typeof form,
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const newForm = form;

    newForm[type] = event.target.value ?? "";
    setForm({ ...newForm });
  };

  const updatePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const validateForm = () => {
    if (!validateEmail(form.email)) return setDisabledButton(true);

    if (!validateConfirmPassword(form.password, passwordConfirm))
      return setDisabledButton(true);

    if (!validateLength(form.password, 8, 100)) return setDisabledButton(true);
    if (!validateLength(form.name)) return setDisabledButton(true);
    if (!validateLength(form.identification)) return setDisabledButton(true);
    if (!form.institutionId) return setDisabledButton(true);
    if (!validateLength(form.email)) return setDisabledButton(true);

    return setDisabledButton(false);
  };

  return {
    updateField,
    disabledButton,
    form,
    updatePasswordConfirm,
    passwordConfirm,
  };
};
