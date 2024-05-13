import { SponsorResponse } from "../model/response/SponsorResponse";
import { privateService } from "./APIService";

export const getSponsorsService = async () => {
  const { data } = await privateService.get<SponsorResponse[]>("/api/sponsors");
  return data;
};
