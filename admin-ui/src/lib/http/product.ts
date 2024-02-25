import { IPayload } from "@/types/response.type";
import requestAPI from "./request";
import { IProductPayload } from "@/types/product.type";
import { AxiosResponse } from "axios";
import {
  ZodProduct as ProductSchema,
  ZodProductImages,
} from "@/schema/product.schema";
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
      country_id: p.country_id,
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

export async function getProductByIdAPI(id: string) {
  const url = `/product/${id}`;

  const response = await requestAPI(url);

  const product = response.data.payload;

  return ProductSchema.parse({
    product_id: product.product_id,
    image_url: product.image_url,
    category_id: product.category_id,
    category_name: product.category_name,
    product_name: product.product_name,
    price: product.price.Int32,
    delivery_price: product.delivery_price.Int32,
    gender: product.gender.enum_gender,
    product_desc: product.product_desc.String,
    quantity: product.quantity.Int32,
    created_on: product.created_on.Time,
    total_count: product.total_count,
    country_id: product.country_id,
  });
}

export async function getProductImagesAPI(id: string) {
  const url = `/product/${id}/images`;

  const response = await (requestAPI(url) as Promise<
    AxiosResponse<IPayload<z.infer<typeof ZodProductImages>[]>>
  >);

  const payload = response.data.payload.map((pi) => ({
    img_id: pi.img_id,
    image_url: pi.image_url,
  }));

  return z.array(ZodProductImages).parse(payload);
}

export async function updateProductAPI(
  payload: FormData,
  id: string
): Promise<AxiosResponse<IPayload<never>>> {
  const url = "/product/" + id;

  return requestAPI.put(url, payload);
}
