import { LocationRequest } from "../model/request/LocationRequest";
import { LocationResponse } from "../model/response/LocationResponse";
import { privateService } from "./APIService";

export const getLocationsService = async () => {
  const { data } = await privateService.get<LocationResponse[]>(
    "/api/locations"
  );
  return data;
};

export const postLocationService = async (eventForm: LocationRequest) => {
  const { data } = await privateService.post<LocationResponse>(
    "api/locations",
    eventForm
  );
  return data;
};

export const putLocationService = async (
  locationForm: LocationRequest,
  locationId: number
) => {
  const { data } = await privateService.put<LocationResponse>(
    `api/locations/${locationId}`,
    locationForm
  );
  return data;
};

export const deleteLocationService = async (locationId: number) => {
  const { data } = await privateService.delete(`api/locations/${locationId}`);
  return data;
};
