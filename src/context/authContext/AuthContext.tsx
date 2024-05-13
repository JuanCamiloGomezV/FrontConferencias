import { createContext, useReducer, useState } from "react";
import { AuthReducer } from "./AuthReducer";
import { UserResponse } from "../../model/response/UserResponse";
import { clearStorage, setItem } from "../../utils/useStorage";
import { useNavigate } from "react-router-dom";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  token?: string;
}

export const authInitialState: AuthState = {
  status: "checking",
};

export interface AuthContextProps {
  authState: AuthState;
  signIn: (token: string) => void;
  signOut: () => void;
  userInformation: UserResponse | undefined;
  setUserInformation: React.Dispatch<
    React.SetStateAction<UserResponse | undefined>
  >;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [authState, dispatch] = useReducer(AuthReducer, authInitialState);

  const [userInformation, setUserInformation] = useState<UserResponse>();

  const signIn = (token: string) => {
    dispatch({ type: "signIn", payload: { token } });
    setItem("token", token);
  };

  const signOut = async () => {
    dispatch({
      type: "signOut",
      payload: {
        token: undefined,
      },
    });
    clearStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signOut,
        userInformation,
        setUserInformation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
