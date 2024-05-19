import { z } from "zod";

export default function getApiResponse<DataType extends z.ZodTypeAny>(
  dataSchema: DataType
) {
  return z.object({
    message: z.string(),
    data: dataSchema,
    pagination: z.object({
      page: z.number(),
      size: z.number(),
      totalPage: z.number(),
    }),
  });
}
