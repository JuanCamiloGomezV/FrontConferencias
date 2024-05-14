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
