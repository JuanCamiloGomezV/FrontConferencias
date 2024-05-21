import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { SignUpService } from "../../../API/AuthenticationService";
import { SignUpRequest } from "../../../model/request/SignUpRequest";
import { AuthContext } from "../../../context/authContext/AuthContext";
import { InstitutionResponse } from "../../../model/response/InstitutionResponse";
import { getInstitutionsService } from "../../../API/InstitutionService";
import { useNavigate } from "react-router-dom";

export const useSignUpViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [institutions, setInstitutions] = useState<InstitutionResponse[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const { signIn, setUserInformation } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getInstitutions();
  }, []);

  const signUp = async (
    event: React.FormEvent<HTMLFormElement>,
    form: SignUpRequest
  ) => {
    try {
      event.preventDefault();
      setError("");
      setLoading(true);
      const userResponse = await SignUpService(form);
      setUserInformation(userResponse);
      signIn(userResponse.token);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
    setLoading(false);
  };

  const getInstitutions = async () => {
    try {
      const institutionResponse = await getInstitutionsService();
      setInstitutions(institutionResponse);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
    setLoadingInstitutions(false);
  };

  return {
    getInstitutions,
    signUp,
    loading,
    error,
    institutions,
    loadingInstitutions,
    setError,
  };
};
