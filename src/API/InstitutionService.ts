import { InstitutionResponse } from "../model/response/InstitutionResponse";
import { publicService } from "./APIService";

export const getInstitutionsService = async () => {
  const { data } = await publicService.get<InstitutionResponse[]>(
    "api/institutions"
  );
  return data;
};
