import { z } from "zod";
import requestAPI from "./request";
import { AxiosResponse } from "axios";
import { IResponse } from "@/types/response.type";

const UserDaywise = z.object({
  day: z.string(),
  value: z.number(),
});

const UserMonthwise = z.object({
  month: z.string(),
  value: z.number(),
});

export async function fetchUsersDaywiseAPI() {
  const url = "/user/grouped-by-date";

  const response = await await (requestAPI.get(url) as Promise<
    AxiosResponse<IResponse>
  >);

  return z.array(UserDaywise).parse(
    response.data?.payload?.map(
      (count: { day: string; total_users: number }) => ({
        day: count.day,
        value: count.total_users,
      })
    )
  );
}

export async function fetchUsersMonthwiseAPI() {
  const url = "/user/grouped-by-month";

  const response = await (requestAPI.get(url) as Promise<
    AxiosResponse<IResponse>
  >);

  return z.array(UserMonthwise).parse(
    response.data?.payload?.map(
      (count: { month: string; total_users: number }) => ({
        month: count.month,
        value: count.total_users,
      })
    )
  );
}
