import Cookies from "js-cookie";
import { StateCreator } from "zustand";

export interface authSliceProp {
  token: string;
  setToken: (token: string) => void;
  resetToken: () => void;
}

export const createAuthSlice: StateCreator<authSliceProp> = (set) => {
  const cookieState = Cookies.get("token");
  const initialToken = cookieState ? JSON.parse(cookieState) : cookieState;

  return {
    token: initialToken,
    setToken: (token) =>
      set((state) => {
        Cookies.set("token", JSON.stringify(token), { expires: 5 });
        return {
          ...state,
          token,
        };
      }),
    resetToken: () =>
      set((state) => {
        Cookies.remove("token");
        return { ...state, token: initialToken };
      }),
  };
};
