import { z } from "zod";
import getApiResponse from "../../../util/getApiResponse";

export const artistSchemaData = z.object({
  id: z.number(),
  artist: z.string(),
  artist_image: z.string(),
  about: z.string(),
  birth: z.string(),
  album: z.array(
    z.object({
      id: z.number(),
      artist_id: z.number(),
      album: z.string(),
      album_image: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
});

export const artistSchema = getApiResponse(z.array(artistSchemaData));
