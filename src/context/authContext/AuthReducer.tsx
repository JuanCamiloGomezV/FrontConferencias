import { AuthState } from "./AuthContext";

type AuthAction = {
  type: "signIn" | "signOut";
  payload: {
    token: string | undefined;
  };
};

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        status: "authenticated",
        token: action.payload.token,
      };
    case "signOut":
      return {
        ...state,
        status: "not-authenticated",
        token: undefined,
      };

    default:
      return state;
  }
};
