import { IGender, IInt32, IString, ITime } from "./general.type";

export interface IProductPayload {
  product_id: number;
  category_id: number;
  product_name: string;
  image_url: string;
  category_name: string;
  price: IInt32;
  delivery_price: IInt32;
  gender: IGender;
  product_desc: IString;
  quantity: IInt32;
  country_id: number;
  created_on: ITime;
  updated_on: ITime;
  total_count: number;
}

export interface IProduct {
  productId: number;
  categoryId: number;
  imageUrl: string;
  categoryName: string;
  productName: string;
  price: number;
  deliveryPrice: number;
  gender: string;
  productDesc: string;
  quantity: number;
  countryId: number;
  createdOn: string;
  updatedOn: string;
}
