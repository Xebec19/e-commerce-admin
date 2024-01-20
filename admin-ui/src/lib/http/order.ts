import { z } from "zod";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import { IOrderCountResponse, IOrderResponse } from "@/types/order.type";
import { IPayload, IResponse } from "@/types/response.type";
import { ZodOrder } from "@/schema/order.schema";

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

export async function fetchOrders() {
  const url = "/order/list?size=10&page=0";

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IPayload<IOrderResponse[]>>
  >);

  return z.array(ZodOrder).parse(
    response.data?.payload?.map((o) => ({
      orderId: o.order_id,
      userName: o.user_name,
      email: o.email,
      price: o.price.Int32,
      deliveryPrice: o.delivery_price.Int32,
      total: o.total.Int32,
      status: o.status.enum_order_status,
      createdOn: o.created_on.Time,
      discountAmount: o.discount_amount.Int32,
      discountCode: o.discount_code.String,
    }))
  );
}
