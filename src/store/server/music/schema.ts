import { z } from "zod";
import getApiResponse from "../../../util/getApiResponse";

export const musicDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  song_mp3: z.string(),
  description: z.string(),
  song_image: z.string(),
  artist: z.string(),
  album: z.string(),
  release_date: z.string(),
  artist_id: z.number(),
  album_id: z.number(),
});

export const musicSchema = getApiResponse(z.array(musicDataSchema));
