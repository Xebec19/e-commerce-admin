import { z } from "zod";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import { IOrderCountResponse } from "@/types/order.type";
import { IResponse } from "@/types/response.type";

const OrderDaywise = z.object({
  day: z.string(),
  value: z.number(),
});

const OrderMonthwise = z.object({
  month: z.string(),
  value: z.number(),
});

export async function fetchOrdersDaywiseAPI() {
  const url = "/order/grouped-by-date";

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IOrderCountResponse>
  >);

  return z.array(OrderDaywise).parse(
    response.data?.payload?.map((count) => ({
      day: count.day,
      value: count.total_orders,
    }))
  );
}

export async function fetchOrdersMonthwiseAPI() {
  const url = "/order/grouped-by-month";

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IResponse>
  >);

  return z.array(OrderMonthwise).parse(
    response.data?.payload?.map(
      (count: { month: string; total_orders: number }) => ({
        month: count.month,
        value: count.total_orders,
      })
    )
  );
}
