import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import { ApiPayload, getParams } from "../../../util/getParams";
import { authJsonHeader } from "../../../util/util";
import { userListSchema } from "./schema";

const userList = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const { data } = await axios.get(`all-users?${params}`, {
    headers: authJsonHeader(),
  });

  return userListSchema.parse(data);
};

export const useUserList = (payload: ApiPayload) => {
  return useQuery({
    queryKey: ["users", payload],
    queryFn: () => userList(payload),
  });
};
