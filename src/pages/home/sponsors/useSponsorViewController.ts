import { useState } from "react";
import { SponsorRequest } from "../../../model/request/SponsorRequest";
import { SponsorResponse } from "../../../model/response/SponsorResponse";

const useSponsorViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [sponsorForm, setSponsorForm] = useState<SponsorRequest>({
    sponsorId:0,
    name: "",

  });

  const onChangeField = (type: keyof SponsorRequest, value: any) => {
    const newSponsorForm = sponsorForm;

    if (type === "name") newSponsorForm.name = value;

    setSponsorForm(newSponsorForm);
  };

  const onEditSponsor = (event: SponsorResponse, eventId: number) => {
    setType("edit");
    const form: SponsorRequest = {
      id: sponsorForm.sponsorId,
      name: sponsorForm.name,

    };

    setSponsorForm(form);

    handleOpen();
  };

  const onCreateSponsor = () => {
    setType("create");

    setSponsorForm({
      name: "",
    });

    handleOpen();
  };

  const onDeleteSponsor = (eventId: number) => {
    setType("delete");

    handleOpen();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return {
    type,
    open,
    handleClose,
    sponsorForm,
    onEditSponsor,
    onCreateSponsor,
    onDeleteSponsor,
    onChangeField,
  };
};

export default useSponsorViewController;
