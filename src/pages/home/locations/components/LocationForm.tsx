import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { LocationResponse } from "../../../../model/response/LocationResponse";
import { UserResponse } from "../../../../model/response/UserResponse";
import { LocationRequest } from "../../../../model/request/LocationRequest";

interface Props {
  loadingLocations: boolean;
  loadingOrganizers: boolean;
  locations: LocationResponse[];
  getLocations: () => void;
  organizers: UserResponse[];
  getOrganizers: () => void;
  onChangeField: (type: keyof LocationRequest, value: any) => void;
  locationForm: LocationRequest;
}

const LocationForm = ({ getLocations, onChangeField, locationForm }: Props) => {
  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="name"
          placeholder="Ingresa el nombre del lugar"
          label="Nombre"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("name", event.target.value)}
          defaultValue={locationForm.name}
        />

        <TextField
          id="address"
          placeholder="Ingresa la direccion"
          label="Direccion"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("address", event.target.value)}
          defaultValue={locationForm.address}
        />

        <TextField
          id="capacity"
          placeholder="Ingresa la capacidad"
          label="Capacidad"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("capacity", event.target.value)}
          defaultValue={locationForm.capacity}
        />
      </div>
    </div>
  );
};

export default LocationForm;
