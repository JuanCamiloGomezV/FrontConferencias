import { MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { SponsorResponse } from "../../../../model/response/SponsorResponse";
import { UserResponse } from "../../../../model/response/UserResponse";
import { EventRequest } from "../../../../model/request/EventRequest";

interface Props {
  loadingSponsors: boolean;
  loadingOrganizers: boolean;
  sponsors: SponsorResponse[];
  getSponsors: () => void;
  organizers: UserResponse[];
  getOrganizers: () => void;
  onChangeField: (type: keyof EventRequest, value: any) => void;
  eventForm: EventRequest;
}

const EventForm = ({
  loadingOrganizers,
  loadingSponsors,
  getSponsors,
  sponsors,
  getOrganizers,
  organizers,
  onChangeField,
  eventForm,
}: Props) => {
  useEffect(() => {
    getSponsors();
    getOrganizers();
  }, []);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="name"
          placeholder="Ingresa el nombre del evento"
          label="Nombre"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("name", event.target.value)}
          defaultValue={eventForm.name}
        />
        <TextField
          id="city"
          placeholder="Ingresa la ciudad del evento"
          label="Ciudad"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("city", event.target.value)}
          defaultValue={eventForm.city}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="outlined-select-currency"
          select
          label={loadingOrganizers ? "Cargando" : "Organizador"}
          fullWidth
          disabled={loadingOrganizers}
          size="medium"
          required
          defaultValue={eventForm.organizatorId ?? ""}
          onChange={(event) =>
            onChangeField("organizatorId", event.target.value)
          }
        >
          {organizers.map((organizer) => (
            <MenuItem
              key={organizer.usuario_id}
              value={organizer.usuario_id ?? ""}
            >
              {organizer.usuario_nombre ?? ""}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label={loadingSponsors ? "Cargando" : "Patrocinador"}
          fullWidth
          size="medium"
          required
          disabled={loadingSponsors}
          defaultValue={eventForm.sponsorId ?? ""}
          onChange={(event) => onChangeField("sponsorId", event.target.value)}
          value={eventForm.sponsorId}
        >
          {sponsors.map((sponsor) => (
            <MenuItem
              key={sponsor.patrocinador_id}
              value={sponsor.patrocinador_id}
            >
              {sponsor.patrocinador_nombre}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        id="outlined-multiline-flexible"
        label="Descripción"
        multiline
        maxRows={4}
        size="medium"
        fullWidth
        onChange={(event) => onChangeField("description", event.target.value)}
        defaultValue={eventForm.description}
      />
    </div>
  );
};

export default EventForm;
