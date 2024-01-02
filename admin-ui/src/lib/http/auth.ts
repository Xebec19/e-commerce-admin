import requestAPI from "./request";

type LoginProps = {
  email: string;
  password: string;
};

export function loginAPI({ email, password }: LoginProps) {
  const url = "/auth/login";
  const payload = {
    email,
    password,
  };

  return requestAPI.post(url, payload);
}
