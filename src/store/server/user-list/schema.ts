import { z } from "zod";
import getApiResponse from "../../../util/getApiResponse";

export const userListSchemaData = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const userListSchema = getApiResponse(z.array(userListSchemaData));
