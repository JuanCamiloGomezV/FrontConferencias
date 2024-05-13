import { Alert, Button, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import useSignInViewModel from "./useSignInViewModel";
import useSignInViewController from "./useSignInViewController";

const SignInScreen = () => {
  const { error, loading, logIn } = useSignInViewModel();
  const { updateField, form, disabledButton } = useSignInViewController();
  return (
    <div className="flex">
      <div className="w-1/2 h-screen flex justify-center items-center">
        <img src="https://img.freepik.com/free-vector/shared-workspace-concept-illustration_114360-5317.jpg?w=1480&t=st=1714955785~exp=1714956385~hmac=698495a3f4c5914b868d89d094a4a6296a600a060568a7339e614d2c640ee0d4" />
      </div>
      <div className="w-1/2 h-screen px-20 py-7">
        <div className="flex w-100 justify-end items-center mb-3">
          <p className="mr-5 text-gray-500 text-sm">¿No tienes una cuenta?</p>
          <NavLink to="/signup">
            <Button variant="outlined" className="text-primary">
              Registrarse
            </Button>
          </NavLink>
        </div>
        <div className="flex justify-center flex-col mt-20">
          {error.length > 0 && (
            <Alert className="mb-5" severity="error">
              {error}
            </Alert>
          )}
          <section className="mb-10">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenido a Infinity!
            </h1>
            <h3 className="mr-5 text-gray-500 mt-1">Inicia sesión</h3>
          </section>

          <form onSubmit={(event) => logIn(event, form)}>
            <section className="grid gap-7">
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="email"
                  id="email"
                  placeholder="Ingresa tu correo"
                  label="Correo"
                  value={form.usuario_correo}
                  onChange={(event) => updateField("usuario_correo", event)}
                  required
                />
              </div>
              <div className="grid w-full items-center gap-2.5">
                <TextField
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  label="Contraseña"
                  value={form.usuario_contrasena}
                  onChange={(event) => updateField("usuario_contrasena", event)}
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
                  <p className="text-white">Iniciar sesión</p>
                )}
              </Button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
