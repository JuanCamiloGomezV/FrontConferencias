import { useEffect, useState } from "react";
import { LocationResponse } from "../../../model/response/LocationResponse";
import { LocationRequest } from "../../../model/request/LocationRequest";
import {
  deleteLocationService,
  getLocationsService,
  postLocationService,
  putLocationService,
} from "../../../API/LocationService";

const useLocationViewModel = () => {
  const [locations, setLocations] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChange, setLoadingChange] = useState(false);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const locationsResponse = await getLocationsService();
      setLocations(locationsResponse);
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

  const putLocation = async (
    locationForm: LocationRequest,
    idLocation: number
  ) => {
    try {
      setLoadingChange(true);
      const newLocation = await putLocationService(locationForm, idLocation);

      const locationsUpdate = locations;
      const indexLocationEdit = locationsUpdate.findIndex(
        (location) => location.ubicacion_id === idLocation
      );
      locationsUpdate[indexLocationEdit] = newLocation;

      setLocations([...locationsUpdate]);
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
  };

  const deleteLocation = async (idLocation: number) => {
    try {
      setLoadingChange(true);
      await deleteLocationService(idLocation);

      const locationsUpdate = locations.filter(
        (location) => location.ubicacion_id !== idLocation
      );
      setLocations([...locationsUpdate]);
    } catch (error) {
      console.error(error);
    }
    setLoadingChange(false);
  };

  return {
    locations,
    loading,
    getLocations,
    postLocation,
    putLocation,
    deleteLocation,
    loadingChange,
  };
};

export default useLocationViewModel;
