import { AxiosResponse } from "axios";
import requestAPI from "./request";
import { z } from "zod";
import CategorySchema, { ZodCategory } from "@/schema/category.schema";
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

export async function createCategory(value: z.infer<typeof CategorySchema>) {
  const url = `/category/create`;
  const formData = new FormData();
  formData.append("categoryName", value.categoryName!);
  formData.append("image", value.image);

  const response = await (requestAPI.post(url, formData) as Promise<
    AxiosResponse<IPayload<null>>
  >);

  return response.data;
}

export async function editCategory(value: z.infer<typeof CategorySchema>) {
  const url = `/category/edit`;
  const formData = new FormData();
  formData.append("categoryId", value.categoryId + "");
  formData.append("categoryName", value.categoryName!);
  formData.append("image", value.image);

  const response = await (requestAPI.post(url, formData) as Promise<
    AxiosResponse<IPayload<null>>
  >);

  return response.data;
}

export async function deleteCategory(
  id: string
): Promise<AxiosResponse<IPayload<never>>> {
  const url = `/category/${id}`;

  return requestAPI.delete(url);
}
