import { SponsorRequest } from "../model/request/SponsorRequest";
import { SponsorResponse } from "../model/response/SponsorResponse";
import { privateService } from "./APIService";

export const getSponsorsService = async () => {
  const { data } = await privateService.get<SponsorResponse[]>("/api/sponsors");
  return data;
};


export const postSponsorService = async (eventForm: SponsorRequest) => {
  const { data } = await privateService.post<SponsorResponse>(
    "api/sponsors",
    eventForm
  );
  return data;
};
