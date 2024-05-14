import { useState } from "react";
import { LocationRequest } from "../../../model/request/LocationRequest";
import { LocationResponse } from "../../../model/response/LocationResponse";

const useLocationViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [locationForm, setLocationForm] = useState<LocationRequest>({
    locationId:0,
    name: "",
    address:"",
    capacity: 0,

  });

  const onChangeField = (type: keyof LocationRequest, value: any) => {
    const newLocationForm = locationForm;

    if (type === "name") newLocationForm.name = value;

    setLocationForm(newLocationForm);
  };

  const onEditLocation = (event: LocationResponse, eventId: number) => {
    setType("edit");
    const form: LocationRequest = {
      locationId : locationForm.locationId,
      name : locationForm.name,
      address : locationForm.address,
      capacity : locationForm.capacity,

    };

    setLocationForm(form);

    handleOpen();
  };

  const onCreateLocation = () => {
    setType("create");

    setLocationForm({
      name: "",
      address:"",
      capacity:0,
    });

    handleOpen();
  };

  const onDeleteLocation = (eventId: number) => {
    setType("delete");

    handleOpen();
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return {
    type,
    open,
    handleClose,
    locationForm,
    onEditLocation,
    onCreateLocation,
    onDeleteLocation,
    onChangeField,
  };
};

export default useLocationViewController;
