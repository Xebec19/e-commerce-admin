import Line from "@/components/graphs/line";
import Pie from "@/components/graphs/pie";
import TimeRange from "@/components/graphs/time-range";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchOrdersDaywiseAPI,
  fetchOrdersMonthwiseAPI,
} from "@/lib/http/order";
import { fetchUsersDaywiseAPI, fetchUsersMonthwiseAPI } from "@/lib/http/user";
import { getMonthName } from "@/lib/utils";
import useSWR from "swr";

export default function DashboardPage() {
  const { data: ordersDaywise = [] } = useSWR(
    "orders/daywise",
    fetchOrdersDaywiseAPI
  );
  const { data: ordersMonthwise = [] } = useSWR(
    "orders/monthwise",
    fetchOrdersMonthwiseAPI
  );

  const { data: usersDaywise = [] } = useSWR(
    "users/daywise",
    fetchUsersDaywiseAPI
  );
  const { data: usersMonthwise = [] } = useSWR(
    "users/monthwise",
    fetchUsersMonthwiseAPI
  );

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
                <Line
                  data={[
                    {
                      id: "orders",
                      data: ordersDaywise.map((u) => ({
                        x: u.day,
                        y: u.value,
                      })),
                    },
                  ]}
                  xLabel="orders"
                  yLabel="count"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Orders (Months)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <Line
                  data={[
                    {
                      id: "orders",
                      data: ordersMonthwise.map((u) => ({
                        x: getMonthName(+u.month),
                        y: u.value,
                      })),
                    },
                  ]}
                  xLabel="users"
                  yLabel="count"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Users (Days)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <Line
                  data={[
                    {
                      id: "users",
                      data: usersDaywise.map((u) => ({ x: u.day, y: u.value })),
                    },
                  ]}
                  xLabel="users"
                  yLabel="count"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Users (Months)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <Line
                  data={[
                    {
                      id: "users",
                      data: usersMonthwise.map((u) => ({
                        x: getMonthName(+u.month),
                        y: u.value,
                      })),
                    },
                  ]}
                  xLabel="users"
                  yLabel="count"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Orders (Days)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <TimeRange data={ordersDaywise} months={4} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Orders (Months)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <Pie
                  data={ordersMonthwise.map((o) => ({
                    id: getMonthName(+o.month),
                    label: getMonthName(+o.month),
                    value: o.value + "",
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Users (Days)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <TimeRange data={usersDaywise} months={4} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-lg">
          <Card>
            <CardHeader>
              <CardTitle className="text-md">{"Users (Months)"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full aspect-square">
                <Pie
                  data={usersMonthwise.map((o) => ({
                    id: getMonthName(+o.month),
                    label: getMonthName(+o.month),
                    value: o.value + "",
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
