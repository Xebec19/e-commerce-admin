export interface IOrderCountDaywise {
  day: string;
  total_orders: number;
}

export interface IOrderCountResponse extends IOrderCountDaywise {
  payload: IOrderCountDaywise[];
}
