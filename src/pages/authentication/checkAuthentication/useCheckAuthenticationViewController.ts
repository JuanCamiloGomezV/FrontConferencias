import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { getItem } from "../../../utils/useStorage";
import { getUserInformationService } from "../../../API/AuthenticationService";

const useCheckAuthenticationViewController = () => {
  const { signIn, signOut, setUserInformation } = useContext(AuthContext);

  useEffect(() => {
    validateUserSesion();
  }, []);

  const validateUserSesion = async () => {
    const token = getItem<string>("token");
    if (token) {
      signIn(token);
      await getUserInformation();
    } else {
      signOut();
    }
  };

  const getUserInformation = async () => {
    try {
      const userResponse = await getUserInformationService();
      setUserInformation(userResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return {};
};

export default useCheckAuthenticationViewController;
