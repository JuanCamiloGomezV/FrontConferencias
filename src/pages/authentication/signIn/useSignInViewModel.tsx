import { useContext, useState } from "react";
import { signInService } from "../../../API/AuthenticationService";
import { SignInRequest } from "../../../model/request/SignInRequest";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { AxiosError } from "axios";

const useSignInViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setUserInformation } = useContext(AuthContext);

  const logIn = async (
    event: React.FormEvent<HTMLFormElement>,
    form: SignInRequest
  ) => {
    try {
      event.preventDefault();
      setLoading(true);
      const userResponse = await signInService(form);
      setUserInformation(userResponse);
      signIn(userResponse.token);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
    setLoading(false);
  };
  return { logIn, error, loading };
};

export default useSignInViewModel;
