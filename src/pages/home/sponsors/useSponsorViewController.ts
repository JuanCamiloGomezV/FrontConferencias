import { useState } from "react";
import { SponsorRequest } from "../../../model/request/SponsorRequest";
import { SponsorResponse } from "../../../model/response/SponsorResponse";

const useSponsorViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [sponsorForm, setSponsorForm] = useState<SponsorRequest>({
    name: "",
  });
  const [sponsorIdSelected, setSponsorIdSelected] = useState<number>();

  const onChangeField = (type: keyof SponsorRequest, value: any) => {
    const newSponsorForm = sponsorForm;

    if (type === "name") newSponsorForm.name = value;

    setSponsorForm(newSponsorForm);
  };

  const onEditSponsor = (sponsor: SponsorResponse, sponsorId: number) => {
    setType("edit");
    const form: SponsorRequest = {
      name: sponsor.patrocinador_nombre,
    };

    setSponsorIdSelected(sponsorId);
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

  const onDeleteSponsor = (sponsorId: number) => {
    setType("delete");
    setSponsorIdSelected(sponsorId);
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
    sponsorIdSelected,
  };
};

export default useSponsorViewController;
