import { useState } from "react";
import { LocationResponse } from "../../../model/response/LocationResponse";
import { LocationRequest } from "../../../model/request/LocationRequest";

const useLocationViewController = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "edit" | "delete">("create");
  const [locationForm, setLocationForm] = useState<LocationRequest>({
    name: "",
    address: "",
    capacity: undefined,
  });
  const [locationIdSelected, setLocationIdSelected] = useState<number>();

  const onChangeField = (type: keyof LocationRequest, value: any) => {
    const newLocationForm = locationForm;

    if (type === "name") newLocationForm.name = value;
    if (type === "address") newLocationForm.address = value;
    if (type === "capacity") newLocationForm.capacity = value;

    setLocationForm(newLocationForm);
  };

  const onEditLocation = (location: LocationResponse, locationId: number) => {
    setType("edit");
    const form: LocationRequest = {
      name: location.ubicacion_nombre,
      address: location.ubicacion_direccion,
      capacity: location.ubicacion_capacidad,
    };
    setLocationIdSelected(locationId);
    setLocationForm(form);

    handleOpen();
  };

  const onCreateLocation = () => {
    setType("create");

    setLocationForm({
      name: "",
      address: "",
      capacity: undefined,
    });

    handleOpen();
  };

  const onDeleteLocation = (locationId: number) => {
    setType("delete");
    setLocationIdSelected(locationId);
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
    locationIdSelected,
  };
};

export default useLocationViewController;
