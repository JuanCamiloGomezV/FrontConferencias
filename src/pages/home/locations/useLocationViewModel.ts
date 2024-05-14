import { useEffect, useState } from "react";
import { getUsersInformationService } from "../../../API/AuthenticationService";
import { getLocationsService, postLocationService } from "../../../API/LocationService";
import { LocationRequest } from "../../../model/request/LocationRequest";
import { LocationResponse } from "../../../model/response/LocationResponse";
import { UserResponse } from "../../../model/response/UserResponse";

const useLocationViewModel = () => {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [organizers, setOrganizers] = useState<UserResponse[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [loadingOrganizers, setLoadingOrganizers] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const eventsResponse = await getLocationsService();
      console.log(eventsResponse);
      setLocations(eventsResponse);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postLocation = async (eventForm: LocationRequest) => {
    try {
      const newLocation = await postLocationService(eventForm);
      setLocations((prev) => [...prev, newLocation]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };




  return {
    locations,
    loading,
    getLocations,
    loadingLocations,
    postLocation,
  };
};

export default useLocationViewModel;
