import { IResponse } from "./response.type";

export interface IOrderCountDaywise {
  day: string;
  total_orders: number;
}

export interface IOrderCountResponse extends IResponse {
  payload: IOrderCountDaywise[];
}
