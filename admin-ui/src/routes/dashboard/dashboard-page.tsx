import TimeRange from "@/components/graphs/time-range";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrdersDaywiseAPI } from "@/lib/http/order";
import useSWR from "swr";

export default function DashboardPage() {
  const { data: orders = [] } = useSWR("orders/daywise", fetchOrdersDaywiseAPI);

  return (
    <div className="p-2">
      <h2 className="font-semibold text-lg my-2">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Orders (Days)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <TimeRange data={orders} months={4} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
