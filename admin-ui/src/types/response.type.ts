export interface IResponse {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  status: boolean;
}

export interface IPayload<T> {
  message: string;
  payload: T;
  status: boolean;
}
