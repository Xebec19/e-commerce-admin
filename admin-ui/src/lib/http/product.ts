import { IPayload } from "@/types/response.type";
import requestAPI from "./request";
import { IProductPayload } from "@/types/product.type";
import { AxiosResponse } from "axios";
import ProductSchema from "@/schema/product.schema";
import { z } from "zod";

export async function getProductAPI() {
  const url = `/product/list`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IPayload<IProductPayload[]>>
  >);

  return z.array(ProductSchema).parse(
    response?.data?.payload?.map((p) => ({
      product_id: p.product_id,
      image_url: p.image_url,
      category_id: p.category_id,
      category_name: p.category_name,
      product_name: p.product_name,
      price: p.price.Int32,
      delivery_price: p.delivery_price.Int32,
      gender: p.gender.enum_gender,
      product_desc: p.product_desc.String,
      quantity: p.quantity.Int32,
      created_on: p.created_on.Time,
      total_count: p.total_count,
    })) || []
  );
}

export async function deleteProduct(
  id: string
): Promise<AxiosResponse<IPayload<never>>> {
  const url = "/product/" + id;
  const response = await requestAPI.delete(url);
  return response.data;
}

export async function createProduct(
  payload: FormData
): Promise<AxiosResponse<IPayload<never>>> {
  const url = "/product";

  return requestAPI.post(url, payload);
}
