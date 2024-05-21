import { useState } from "react";
import { SignUpRequest } from "../../../model/request/SignUpRequest";
import { UserResponse } from "../../../model/response/UserResponse";

const usePersonsViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [form, setForm] = useState<SignUpRequest>({
    email: "",
    identification: "",
    institutionId: undefined,
    name: "",
    password: "",
    roleId: undefined,
    photo: "",
  });
  const [personIdSelected, setPersonIdSelected] = useState<number>();

  const onChangeField = (type: keyof SignUpRequest, value: any) => {
    const newForm = form;

    if (type === "email" && typeof value == "string") newForm.email = value;
    if (type === "identification" && typeof value == "string")
      newForm.identification = value;
    if (type === "name" && typeof value == "string") newForm.name = value;
    if (type === "password" && typeof value == "string")
      newForm.password = value;
    if (type === "institutionId" && typeof value == "number")
      newForm.institutionId = value;
    if (type === "roleId" && typeof value == "number") newForm.roleId = value;
    if (type === "photo" && typeof value == "string") newForm.photo = value;

    setForm({ ...newForm });
  };

  const onCreatePerson = () => {
    setType("create");
    setForm({
      email: "",
      identification: "",
      institutionId: undefined,
      name: "",
      password: "",
      roleId: undefined,
    });

    handleOpen();
  };

  const onEditPerson = (person: UserResponse, personId: number) => {
    setType("edit");
    const newForm: SignUpRequest = {
      email: person.usuario_correo,
      identification: person.usuario_cedula,
      institutionId: person.usuario_institucion_id,
      name: person.usuario_nombre,
      password: "",
      roleId: person.usuario_rol_id,
      photo: person.usuario_foto,
    };

    setPersonIdSelected(personId);
    setForm(newForm);
    handleOpen();
  };

  const onDeletePerson = (personId: number) => {
    setType("delete");
    setPersonIdSelected(personId);
    handleOpen();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return {
    type,
    open,
    handleClose,
    onCreatePerson,
    onEditPerson,
    onDeletePerson,
    onChangeField,
    form,
    personIdSelected,
  };
};

export default usePersonsViewController;
