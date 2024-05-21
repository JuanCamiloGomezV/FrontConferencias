import { useEffect, useState } from "react";
import { UserResponse } from "../../../model/response/UserResponse";
import {
  SignUpService,
  deleteUserService,
  getUsersInformationService,
} from "../../../API/AuthenticationService";
import { getRolesService } from "../../../API/RoleService";
import { RoleResponse } from "../../../model/response/RoleResponse";
import { getInstitutionsService } from "../../../API/InstitutionService";
import { InstitutionResponse } from "../../../model/response/InstitutionResponse";
import { SignUpRequest } from "../../../model/request/SignUpRequest";
import { AxiosError } from "axios";

const usePersonsViewModel = () => {
  const [persons, setPersons] = useState<UserResponse[]>([]);
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingInstitutions, setLoadingInstitutions] = useState(false);
  const [error, setError] = useState("");
  const [loadingChange, setLoadingChange] = useState(false);

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    try {
      const personsResponse = await getUsersInformationService();
      setPersons(personsResponse);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getRoles = async () => {
    try {
      setLoadingRoles(true);
      const rolesResponse = await getRolesService();
      setRoles(rolesResponse);
    } catch (error) {
      console.log(error);
    }
    setLoadingRoles(false);
  };

  const getInstitutions = async () => {
    try {
      setLoadingInstitutions(true);
      const institutionsResponse = await getInstitutionsService();
      setInstitutions(institutionsResponse);
    } catch (error) {
      console.log(error);
    }
    setLoadingInstitutions(false);
  };

  const postPerson = async (form: SignUpRequest, handleClose: () => void) => {
    try {
      setLoadingChange(true);
      setError("");
      const newPerson = await SignUpService(form);
      setPersons((prev) => [...prev, newPerson]);
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    }
    setLoading(false);
    setLoadingChange(false);
  };

  const deletePerson = async (idPerson: number, handleClose: () => void) => {
    try {
      setLoadingChange(true);
      await deleteUserService(idPerson);

      const personsUpdate = persons.filter(
        (person) => person.usuario_id !== idPerson
      );
      setPersons([...personsUpdate]);
      handleClose();
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
  };

  return {
    persons,
    loading,
    getRoles,
    postPerson,
    roles,
    loadingRoles,
    getInstitutions,
    institutions,
    loadingInstitutions,
    error,
    setError,
    loadingChange,
    deletePerson,
  };
};

export default usePersonsViewModel;
