import { useEffect, useState } from "react";
import { UserResponse } from "../../../model/response/UserResponse";
import { getUsersInformationService } from "../../../API/AuthenticationService";

const usePersonsViewModel = () => {
  const [persons, setPersons] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersons();
  }, []);

  const getPersons = async () => {
    try {
      const personsResponse = await getUsersInformationService();
      console.log(personsResponse);
      setPersons(personsResponse);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const postPerson = async () => {};

  return {
    persons,
    loading,
  };
};

export default usePersonsViewModel;
