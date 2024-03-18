import { z } from "zod";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import {
  IOrderCountResponse,
  IOrderDetails,
  IOrderResponse,
} from "@/types/order.type";
import { IPayload, IResponse } from "@/types/response.type";
import { ZodOrder, ZodOrderDetails } from "@/schema/order.schema";

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
    })) || []
  );
}

export async function fetchOrderDetailsAPI(orderID: string) {
  const url = `/order/${orderID}`;

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IPayload<IOrderDetails>>
  >);

  const { order, order_items } = response.data.payload;

  return ZodOrderDetails.parse({
    order: {
      order_id: order.order_id,
      user_name: order.user_name,
      email: order.email,
      price: order.price.Int32,
      delivery_price: order.delivery_price.Int32,
      total: order.total.Int32,
      status: order.status.enum_order_status,
      created_on: order.created_on.Time,
      billing_user_name: order.billing_user_name,
      billing_email: order.billing_email,
      billing_phone: order.billing_phone.String,
      billing_address: order.billing_address.String,
      shipping_user_name: order.shipping_user_name,
      shipping_email: order.shipping_email,
      shipping_phone: order.shipping_phone.String,
      shipping_address: order.shipping_address.String,
      discount_code: order.discount_code.String,
      discount_amount: order.discount_amount.Int32,
    },
    order_items: order_items?.map((item) => ({
      od_id: item.od_id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price.Int32,
      delivery_price: item.delivery_price.Int32,
      quantity: item.quantity,
      product_desc: item.product_desc.String,
      status: item.status.enum_status,
      country_id: item.country_id.Int32,
      category_id: item.category_id,
      category_name: item.category_name,
    })),
  });
}

export async function updateOrderAPI({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}): Promise<IPayload<never>> {
  const url = `/order/${orderId}`;

  const response = await (requestAPI.put(url, { status }) as Promise<
    AxiosResponse<IPayload<never>>
  >);

  return response.data;
}
