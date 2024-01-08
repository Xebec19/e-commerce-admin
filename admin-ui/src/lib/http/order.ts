import { z } from "zod";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import { IOrderCountResponse } from "@/types/order.type";

const OrderDaywise = z.object({
  day: z.string(),
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
