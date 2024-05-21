import { SponsorRequest } from "../model/request/SponsorRequest";
import { SponsorResponse } from "../model/response/SponsorResponse";
import { privateService } from "./APIService";

export const getSponsorsService = async () => {
  const { data } = await privateService.get<SponsorResponse[]>("/api/sponsors");
  return data;
};

export const postSponsorService = async (sponsorForm: SponsorRequest) => {
  const { data } = await privateService.post<SponsorResponse>(
    "api/sponsors",
    sponsorForm
  );
  return data;
};

export const putSponsorService = async (
  sponsorForm: SponsorRequest,
  sponsorId: number
) => {
  const { data } = await privateService.put<SponsorResponse>(
    `api/sponsors/${sponsorId}`,
    sponsorForm
  );
  return data;
};

export const deleteSponsorService = async (sponsorId: number) => {
  const { data } = await privateService.delete(`api/sponsors/${sponsorId}`);
  return data;
};
