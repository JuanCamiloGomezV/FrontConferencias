import { SignInRequest } from "../model/request/SignInRequest";
import { SignUpRequest } from "../model/request/SignUpRequest";
import { UserResponse } from "../model/response/UserResponse";
import { privateService, publicService } from "./APIService";

export const SignUpService = async (form: SignUpRequest) => {
  const { data } = await publicService.post<UserResponse>(
    "api/auth/signup",
    form
  );
  return data;
};

export const signInService = async (form: SignInRequest) => {
  const { data } = await publicService.post<UserResponse>(
    "api/auth/signin",
    form
  );

  return data;
};
export const getUsersInformationService = async (roleId?: number) => {
  const { data } = await privateService.get<UserResponse[]>(`api/auth/users`, {
    params: { roleId },
  });

  return data;
};

export const getUserInformationService = async () => {
  const { data } = await privateService.get<UserResponse>(`api/auth/user`);

  return data;
};
