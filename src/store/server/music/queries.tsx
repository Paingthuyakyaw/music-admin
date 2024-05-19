import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import { ApiPayload, getParams } from "../../../util/getParams";
import { musicSchema } from "./schema";

const music = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const { data } = await axios.get(`music?${params}`);
  return musicSchema.parse(data);
};

export const useMusic = (payload: ApiPayload) => {
  return useQuery({
    queryKey: ["music", payload],
    queryFn: () => music(payload),
  });
};
