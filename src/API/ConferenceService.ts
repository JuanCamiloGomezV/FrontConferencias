import { ConferenceResponse } from "../model/response/ConferenceResponse";
import { privateService } from "./APIService";

export const getConferencesService = async () => {
  const { data } = await privateService.get<ConferenceResponse[]>(
    "api/conferences"
  );
  return data;
};
