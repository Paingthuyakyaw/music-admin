import { create } from "zustand";
import { authSliceProp, createAuthSlice } from "./authSlice";

const useStore = create<authSliceProp>((...a) => ({
  ...createAuthSlice(...a),
}));

export const useAuthStore = () => {
  const { token, setToken, resetToken } = useStore((state) => ({
    token: state.token,
    setToken: state.setToken,
    resetToken: state.resetToken,
  }));

  return { token, setToken, resetToken };
};
