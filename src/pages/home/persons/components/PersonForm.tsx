import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, Button, MenuItem, TextField, styled } from "@mui/material";
import { useEffect } from "react";
import { SignUpRequest } from "../../../../model/request/SignUpRequest";
import { InstitutionResponse } from "../../../../model/response/InstitutionResponse";
import { RoleResponse } from "../../../../model/response/RoleResponse";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface Props {
  loadingRoles: boolean;
  getRoles: () => void;
  roles: RoleResponse[];
  loadingInstitutions: boolean;
  getInstitutions: () => void;
  institutions: InstitutionResponse[];
  type: "create" | "edit" | "delete";
  onChangeField: (type: keyof SignUpRequest, value: any) => void;
  form: SignUpRequest;
}
const PersonForm = ({
  loadingRoles,
  getRoles,
  roles,
  getInstitutions,
  institutions,
  loadingInstitutions,
  type,
  onChangeField,
  form,
}: Props) => {
  useEffect(() => {
    getRoles();
    getInstitutions();
  }, []);

  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="name"
          placeholder="Ingresa el nombre de la persona"
          label="Nombre"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("name", event.target.value)}
          defaultValue={form.name}
        />
        <TextField
          id="identification"
          placeholder="Ingresa la cedula de la persona"
          label="Cedula"
          required
          size="medium"
          fullWidth
          onChange={(event) =>
            onChangeField("identification", event.target.value)
          }
          defaultValue={form.identification}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="email"
          placeholder="Ingresa el correo de la persona"
          label="Correo"
          required
          size="medium"
          fullWidth
          onChange={(event) => onChangeField("email", event.target.value)}
          defaultValue={form.email}
        />
        <TextField
          id="password"
          placeholder="Ingresa la contraseña de la persona"
          label="Contraseña"
          required
          size="medium"
          fullWidth
          type="password"
          onChange={(event) => onChangeField("password", event.target.value)}
          defaultValue={form.password}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <TextField
          id="outlined-select-currency"
          select
          label={loadingInstitutions ? "Cargando" : "Institución"}
          fullWidth
          size="medium"
          disabled={loadingInstitutions}
          required
          defaultValue={form.institutionId ?? ""}
          onChange={(event) =>
            onChangeField("institutionId", event.target.value)
          }
          value={form.institutionId}
        >
          {institutions.map((institution) => (
            <MenuItem
              key={institution.institucion_id}
              value={institution.institucion_id}
            >
              {institution.institucion_nombre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label={loadingRoles ? "Cargando" : "Rol"}
          fullWidth
          size="medium"
          disabled={loadingRoles || type === "edit"}
          required
          defaultValue={form.roleId ?? ""}
          onChange={(event) => onChangeField("roleId", event.target.value)}
          value={form.roleId}
        >
          {roles.map((role) => (
            <MenuItem key={role.rol_id} value={role.rol_id}>
              {role.rol_nombre}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default PersonForm;
