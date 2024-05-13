import { useState } from "react";

const usePersonsViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");

  const onChangeField = () => {};

  const onEditPerson = () => {
    setType("edit");

    handleOpen();
  };

  const onCreatePerson = () => {
    setType("create");

    handleOpen();
  };

  const onDeletePerson = () => {
    setType("delete");

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
  };
};

export default usePersonsViewController;
