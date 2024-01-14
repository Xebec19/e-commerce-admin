import { AxiosResponse } from "axios";
import requestAPI from "./request";
import { z } from "zod";
import { ZodCategory } from "@/schema/category.schema";
import { ICategoryResponse } from "@/types/category.type";

export async function getCategoryAPI() {
  const url = "/category/list";

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<ICategoryResponse>
  >);

  const rows = response.data.payload.map((c) => ({
    categoryId: c.category_id,
    categoryName: c.category_name,
    createdOn: c.created_on.Time,
    imageUrl: c.image_url.String,
    status: c.status.enum_status,
  }));

  return z.array(ZodCategory).parse(rows);
}
