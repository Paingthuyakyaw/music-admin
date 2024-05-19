import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios";
import { ApiPayload, getParams } from "../../../util/getParams";
import { albumData } from "./schema";

const album = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const { data } = await axios.get(`album?${params}`);
  return albumData.parse(data);
};

export const useAlbum = (payload: ApiPayload) => {
  return useQuery({
    queryKey: ["album", payload],
    queryFn: () => album(payload),
  });
};

