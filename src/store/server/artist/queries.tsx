import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import { ApiPayload, getParams } from "../../../util/getParams";
import { artistSchema } from "./schema";

const artist = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const { data } = await axios.get(`artist?${params}`);
  return artistSchema.parse(data);
};

export const useArtist = (payload: ApiPayload) => {
  return useQuery({
    queryKey: ["artist", payload],
    queryFn: () => artist(payload),
  });
};
