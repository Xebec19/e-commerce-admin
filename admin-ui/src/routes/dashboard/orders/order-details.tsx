import OrderContent from "@/components/order/order-content";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchOrderDetailsAPI } from "@/lib/http/order";

import { useParams } from "react-router-dom";
import useSWR from "swr";

export default function OrderDetails() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(id ? `order/${id}` : null, () =>
    fetchOrderDetailsAPI(id!)
  );

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
