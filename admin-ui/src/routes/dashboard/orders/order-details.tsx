import { Skeleton } from "@/components/ui/skeleton";
import { APP_CURRENCY, APP_CURRENCY_CODE } from "@/lib/environments";
import { fetchOrderDetailsAPI } from "@/lib/http/order";
import { cn, getOrderStatusColor } from "@/lib/utils";
import { ZodOrderDetails } from "@/schema/order.schema";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { z } from "zod";

export default function OrderDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(id ? `order/${id}` : null, () =>
    fetchOrderDetailsAPI(id!)
  );
  console.log({ data });

  if (error) {
    console.error(error);
    return (
      <h1 className="text-sm text-red-500">
        Something went wrong! Order details could not be loaded.
      </h1>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {isLoading ? <OrderSkeleton /> : <OrderContent orderDetails={data!} />}
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="space-y-4 p-4 border">
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-full rounded-md h-4" />
      <Skeleton className="w-1/2 rounded-md h-4" />
    </div>
  );
}

type OrderContentProps = {
  orderDetails: z.infer<typeof ZodOrderDetails>;
};

function OrderContent({ orderDetails }: OrderContentProps) {
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
            <span
              className={cn(
                "font-semibold uppercase",
                getOrderStatusColor(orderDetails.order.status)
              )}
            >
              {orderDetails.order.status}
            </span>
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
    </>
  );
}
