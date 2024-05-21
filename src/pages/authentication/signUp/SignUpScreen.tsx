import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSignUpViewController } from "./useSignUpViewController";
import { useSignUpViewModel } from "./useSignUpViewModel";
import { NavLink } from "react-router-dom";

const SignUpScreen = () => {
  const {
    disabledButton,
    form,
    updateField,
    passwordConfirm,
    updatePasswordConfirm,
  } = useSignUpViewController();
  const {
    signUp,
    loading,
    error,
    institutions,
    loadingInstitutions,
    setError,
  } = useSignUpViewModel();
  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex justify-center items-center">
        <img src="https://img.freepik.com/free-vector/shared-workspace-concept-illustration_114360-5317.jpg?w=1480&t=st=1714955785~exp=1714956385~hmac=698495a3f4c5914b868d89d094a4a6296a600a060568a7339e614d2c640ee0d4" />
      </div>
      <div className="w-1/2 h-screen px-20 py-7">
        <div className="flex w-100 justify-end items-center mb-3">
          <p className="mr-5 text-gray-500 text-sm">¿Ya tienes una cuenta?</p>
          <NavLink to="/">
            <Button variant="outlined" className="text-primary">
              Iniciar sesión
            </Button>
          </NavLink>
        </div>
        <div className="flex justify-center flex-col mt-10">
          {error.length > 0 && (
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          )}
          <section className="mb-10">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenido a Infinity!
            </h1>
            <h3 className="mr-5 text-gray-500 mt-1">Crea tu cuenta</h3>
          </section>

          <form onSubmit={(event) => signUp(event, form)} action="/">
            <section className="grid gap-7">
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="text"
                  id="name"
                  placeholder="Ingresa tu nombre"
                  label="Nombre"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  color="primary"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="text"
                  id="identification"
                  placeholder="Ingresa tu cedula"
                  label="Cedula"
                  value={form.identification}
                  onChange={(event) =>
                    updateField("identification", event.target.value)
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2.5">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" required>
                    {loadingInstitutions ? "Cargando..." : "Institución"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={loadingInstitutions ? "Cargando..." : "Institución"}
                    required
                    onChange={(event) =>
                      updateField("institutionId", event.target.value)
                    }
                    value={form.institutionId}
                    disabled={loadingInstitutions}
                  >
                    {institutions.map((institution) => (
                      <MenuItem
                        value={institution.institucion_id}
                        key={institution.institucion_id}
                      >
                        {institution.institucion_nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="email"
                  id="email"
                  placeholder="Ingresa tu correo"
                  label="Correo"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  label="Contraseña"
                  value={form.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="password"
                  id="passwordConfirm"
                  placeholder="Confirma tu contraseña"
                  label="Confirmar contraseña"
                  value={passwordConfirm}
                  onChange={updatePasswordConfirm}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={disabledButton || loading}
                variant="contained"
                disableElevation
                size="large"
              >
                {loading ? (
                  <p className="text-white">Cargando...</p>
                ) : (
                  <p className="text-white">Registrarse</p>
                )}
              </Button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
