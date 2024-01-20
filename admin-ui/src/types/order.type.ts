import { IInt32, IOrderStatus, IString, ITime } from "./general.type";
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
