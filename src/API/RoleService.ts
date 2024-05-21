import { RoleResponse } from "../model/response/RoleResponse";
import { privateService } from "./APIService";

export const getRolesService = async () => {
  const { data } = await privateService.get<RoleResponse[]>("api/roles");
  return data;
};
