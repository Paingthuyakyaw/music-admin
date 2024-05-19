import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import { loginProp, registerProp } from "./typed";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useAuthStore } from "../../client/useStore";

// ============ register ============ //

const register = async (payload: registerProp) => {
  const { data } = await axios.post("admin-register", payload, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  return data;
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: registerProp) => register(payload),
    onSuccess: () => {
      navigate("/login");
      notifications.show({
        // title: "Login Success",
        message: "Register Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Register Fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};

// ============ login ============ //
const login = async (payload: loginProp) => {
  const { data } = await axios.post("admin-login", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const useLogin = () => {
  const { setToken } = useAuthStore();
  const navigate = useNavigate(); // testing //
  return useMutation({
    mutationFn: (payload: loginProp) => login(payload),
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/");
      notifications.show({
        message: "Login Successfully",
        icon: <IconCheck />,
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Login Fail",
        message: "Please try again!",
        icon: <IconX />,
        color: "red",
      });
    },
  });
};
