import { TextField } from "@mui/material";
import { useEffect } from "react";
import { SponsorRequest } from "../../../../model/request/SponsorRequest";

interface Props {
  getSponsors: () => void;
  onChangeField: (type: keyof SponsorRequest, value: any) => void;
  sponsorForm: SponsorRequest;
}

const SponsorForm = ({ getSponsors, onChangeField, sponsorForm }: Props) => {
  useEffect(() => {
    getSponsors();
  }, []);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="name"
          placeholder="Ingresa el nombre del patrocinador"
          label="Nombre"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("name", event.target.value)}
          defaultValue={sponsorForm.name}
        />
      </div>
    </div>
  );
};

export default SponsorForm;
