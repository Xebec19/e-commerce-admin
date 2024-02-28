import { Skeleton } from "@/components/ui/skeleton";
import { fetchOrderDetailsAPI } from "@/lib/http/order";
import { ZodOrderDetails } from "@/schema/order.schema";
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
      <h1 className="font-semibold text-lg">Order Details</h1>
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
    <div className="p-4 border rounded-md space-y-4">
      <h1 className="font-semibold text-lg">{orderDetails.order.order_id}</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Username</span>
          <span>{orderDetails.order.user_name}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="font-semibold">Order ID</span>
          <span>{orderDetails.order.order_id}</span>
        </div>
      </div>
    </div>
  );
}
