import { z } from "zod";
import getApiResponse from "../../../util/getApiResponse";

export const albumSchemaData = z.object({
  id: z.number(),
  artist_id: z.number(),
  album: z.string(),
  album_image: z.string(),
  artist: z.object({
    artist: z.string(),
  }),
});

export const albumData = getApiResponse(z.array(albumSchemaData));
