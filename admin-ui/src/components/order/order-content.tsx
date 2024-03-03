import { APP_CURRENCY, APP_CURRENCY_CODE } from "@/lib/environments";
import { cn, getOrderStatusColor } from "@/lib/utils";
import { ZodOrderDetails } from "@/schema/order.schema";
import { format } from "date-fns";
import { X } from "lucide-react";
import { z } from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";
import { updateOrderAPI } from "@/lib/http/order";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { useSWRConfig } from "swr";

type OrderContentProps = {
  orderDetails: z.infer<typeof ZodOrderDetails>;
};

export default function OrderContent({ orderDetails }: OrderContentProps) {
  const [disabled, setDisabled] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const { toast } = useToast();

  async function updateOrderStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }) {
    if (!confirm("Are you sure ?")) {
      return;
    }
    try {
      setDisabled(true);
      const response = await updateOrderAPI({ orderId, status });

      if (!response.status) {
        throw new Error(response.message);
      }

      toast({
        title: "Order updated",
        description: "Order status updated successfully",
      });

      mutate(`order/${orderId}`);
      mutate("order-list");
    } catch (error) {
      console.error(error);
      // @ts-expect-error error is of type Error
      let message = error.message;
      if (error instanceof AxiosError) {
        message = error.response?.data?.message;
      }

      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
    } finally {
      setDisabled(false);
    }
  }

  return (
    <>
      <h1 className="font-semibold text-lg">Order Details</h1>
      <div className="p-4 border rounded-md space-y-4">
        <div
          className={cn(
            "grid grid-cols-2 gap-4 border-b-2 pb-4",
            getOrderStatusColor(orderDetails.order.status)
          )}
        >
          <div className="text-xl font-semibold">
            <span>{orderDetails.order.order_id}</span>
          </div>

          <div className="text-xl font-semibold">
            <span>{`${APP_CURRENCY_CODE} ${
              orderDetails.order.total.toFixed(2) ?? 0
            } ${APP_CURRENCY}`}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Username</span>
            <span>{orderDetails.order.user_name}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Email</span>
            <span>{orderDetails.order.email}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Price</span>
            <span>{`${APP_CURRENCY_CODE} ${
              orderDetails.order.price.toFixed(2) ?? 0
            } ${APP_CURRENCY}`}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Delivery Price</span>
            <span>{`${APP_CURRENCY_CODE} ${
              orderDetails.order.delivery_price.toFixed(2) ?? 0
            } ${APP_CURRENCY}`}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Total</span>
            <span>{`${APP_CURRENCY_CODE} ${
              orderDetails.order.total.toFixed(2) ?? 0
            } ${APP_CURRENCY}`}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Status</span>

            {orderDetails.order.status === "processing" ? (
              <div className="space-x-2">
                <Button
                  className="uppercase"
                  disabled={disabled}
                  onClick={() =>
                    updateOrderStatus({
                      orderId: orderDetails.order.order_id,
                      status: "confirmed",
                    })
                  }
                >
                  Confirm
                </Button>
                <Button
                  className="uppercase"
                  variant={"destructive"}
                  disabled={disabled}
                  onClick={() =>
                    updateOrderStatus({
                      orderId: orderDetails.order.order_id,
                      status: "cancelled",
                    })
                  }
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <span
                className={cn(
                  "font-semibold uppercase",
                  getOrderStatusColor(orderDetails.order.status)
                )}
              >
                {orderDetails.order.status}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Created On</span>
            <span>
              {format(orderDetails.order.created_on, "dd/MM/yyyy hh:mm a")}
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Discount Code</span>
            {orderDetails.order.discount_code.length ? (
              <span className="text-green-500">
                {orderDetails.order.discount_code}
              </span>
            ) : (
              <span className="text-muted">
                No discount applied for this order.{" "}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Discount Amount</span>
            {orderDetails.order.discount_amount > 0 ? (
              <span className="text-green-500">
                {`${APP_CURRENCY_CODE} ${
                  orderDetails.order.discount_amount.toFixed(2) ?? 0
                } ${APP_CURRENCY}`}
              </span>
            ) : (
              <span className="text-muted">
                No discount applied for this order.{" "}
              </span>
            )}
          </div>
        </div>
      </div>

      <h1 className="font-semibold text-lg">Shipping Details</h1>

      <div className="p-4 border rounded-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Email</span>
            <span>{orderDetails.order.shipping_email}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Phone</span>
            <span>{orderDetails.order.shipping_phone}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Address</span>
            <span>{orderDetails.order.shipping_address}</span>
          </div>
        </div>
      </div>

      <h1 className="font-semibold text-lg">Billing Details</h1>

      <div className="p-4 border rounded-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Name</span>
            <span>{orderDetails.order.billing_user_name}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Email</span>
            <span>{orderDetails.order.billing_email}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Phone</span>
            <span>{orderDetails.order.billing_phone}</span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Address</span>
            <span>{orderDetails.order.billing_address}</span>
          </div>
        </div>
      </div>

      <h1 className="font-semibold text-lg">Order Items</h1>

      {orderDetails.order_items.length ? (
        <OrderList orderItems={orderDetails.order_items} />
      ) : (
        <span className="text-sm font-semibold">{"No Order Items Found!"}</span>
      )}
    </>
  );
}

type OrderListProps = {
  orderItems: z.infer<typeof ZodOrderDetails>["order_items"];
};

function OrderList({ orderItems }: OrderListProps) {
  return orderItems.map((oi) => (
    <div className="p-4 border rounded-md space-y-4" key={oi.od_id}>
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <h1 className="font-semibold text-md">{oi.product_name}</h1>

          <X className="size-2" />
          <span className="text-md font-semibold">{oi.quantity}</span>
        </div>

        <span className="font-semibold text-md">
          {APP_CURRENCY_CODE}&nbsp;
          {oi.quantity * oi.price + oi.delivery_price}&nbsp;
          {APP_CURRENCY}
        </span>
      </div>

      <div>
        <Badge>{oi.category_name}</Badge>
      </div>

      <p className="text-sm font-light text-ellipsis">{oi.product_desc}</p>

      <div className="divide-y-2 ">
        <div className="flex justify-between py-2">
          <span>Price</span>
          <span>
            {APP_CURRENCY_CODE}&nbsp;
            {oi.price}&nbsp;
            {APP_CURRENCY}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Quantity</span>
          <span className="flex">
            <X className="size-2" />
            &nbsp;
            {oi.quantity}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Sub Total</span>
          <span>
            {APP_CURRENCY_CODE}&nbsp;{oi.quantity * oi.price}&nbsp;
            {APP_CURRENCY}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Delivery Price</span>
          <span>
            {APP_CURRENCY_CODE}&nbsp;{oi.delivery_price}&nbsp;{APP_CURRENCY}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span>Total</span>
          <span>
            {APP_CURRENCY_CODE}&nbsp;
            {oi.price * oi.quantity + oi.delivery_price}&nbsp;{APP_CURRENCY}
          </span>
        </div>
      </div>
    </div>
  ));
}
