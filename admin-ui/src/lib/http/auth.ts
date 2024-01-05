import { IResponse } from "@/types/response.type";
import requestAPI from "./request";
import { AxiosResponse } from "axios";

type LoginProps = {
  email: string;
  password: string;
};

export function loginAPI({
  email,
  password,
}: LoginProps): Promise<AxiosResponse<IResponse>> {
  const url = "/auth/login";
  const payload = {
    email,
    password,
  };

  return requestAPI.post(url, payload);
}
