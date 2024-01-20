import { columns } from "@/components/columns/order-columns";
import { DataTable } from "@/components/ui/data-table/table";
import { fetchOrders } from "@/lib/http/order";
import useSWR from "swr";

export default function OrderList() {
  const { data: orders = [], error } = useSWR("order-list", fetchOrders);

  if (error) {
    return (
      <div className="p-4">
        <span className="text-red-500">
          Something went wrong! Orders could not be loaded.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-semibold text-lg">Orders</h1>

      <DataTable columns={columns} data={orders} searchableCol="userName" />
    </div>
  );
}
