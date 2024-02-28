import { IInt32, IOrderStatus, IStatus, IString, ITime } from "./general.type";
import { IResponse } from "./response.type";

export interface IOrderCountDaywise {
  day: string;
  total_orders: number;
}

export interface IOrderCountResponse extends IResponse {
  payload: IOrderCountDaywise[];
}

export interface IOrderResponse {
  order_id: string;
  user_name: string;
  email: string;
  price: IInt32;
  delivery_price: IInt32;
  total: IInt32;
  status: IOrderStatus;
  created_on: ITime;
  discount_amount: IInt32;
  discount_code: IString;
}

export interface IOrder {
  orderId: string;
  userName: string;
  email: string;
  price: number;
  deliveryPrice: number;
  total: number;
  status: string;
  createdOn: string;
  discountAmount: number;
  discountCode: string;
}

export interface IOrderDetails {
  order: Order;
  order_items?: OrderItemsEntity[] | null;
}

export interface Order {
  order_id: string;
  user_name: string;
  email: string;
  price: IInt32;
  delivery_price: IInt32;
  total: IInt32;
  status: IOrderStatus;
  created_on: ITime;
  billing_user_name: string;
  billing_email: string;
  billing_phone: IString;
  billing_address: IString;
  shipping_user_name: string;
  shipping_email: string;
  shipping_phone: IString;
  shipping_address: IString;
  discount_code: IString;
  discount_amount: IInt32;
}

export interface OrderItemsEntity {
  od_id: number;
  product_id: number;
  product_name: string;
  price: IInt32;
  delivery_price: IInt32;
  quantity: number;
  product_desc: IString;
  status: IStatus;
  country_id: IInt32;
  category_id: number;
  category_name: string;
}
