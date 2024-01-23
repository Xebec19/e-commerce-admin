import { IPayload } from "@/types/response.type";
import requestAPI from "./request";
import { IProductPayload } from "@/types/product.type";
import { AxiosResponse } from "axios";
import ProductSchema from "@/schema/product.schema";
import { z } from "zod";
import { PaginationState } from "@tanstack/react-table";

export async function getProductAPI({ pageIndex, pageSize }: PaginationState) {
  const url = `/product/list?page=${pageIndex}&size=${pageSize}`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IPayload<IProductPayload[]>>
  >);

  return z.array(ProductSchema).parse(
    response?.data?.payload?.map((p) => ({
      productId: p.product_id,
      imageUrl: p.image_url,
      categoryId: p.category_id,
      categoryName: p.category_name,
      productName: p.category_name,
      price: p.price.Int32,
      deliveryPrice: p.delivery_price.Int32,
      gender: p.gender.enum_gender,
      productDesc: p.product_desc.String,
      quantity: p.quantity.Int32,
      createdOn: p.created_on.Time,
      totalCount: p.total_count,
    })) || []
  );
}