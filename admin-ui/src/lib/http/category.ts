import { AxiosResponse } from "axios";
import requestAPI from "./request";
import { z } from "zod";
import { ZodCategory } from "@/schema/category.schema";
import { ICategory, ICategoryResponse } from "@/types/category.type";
import { IPayload } from "@/types/response.type";

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

export async function getCategoryByIdAPI(id: string) {
  const url = `/category/list/${id}`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IPayload<ICategory>>
  >);

  const row = {
    categoryId: response.data.payload.category_id,
    categoryName: response.data.payload.category_name,
    createdOn: response.data.payload.created_on.Time,
    imageUrl: response.data.payload.image_url.String,
    status: response.data.payload.status.enum_status,
  };

  return ZodCategory.parse(row);
}
