import { IString, ITime, IStatus } from "./general.type";
import { IResponse } from "./response.type";

export interface ICategory {
  category_id: number;
  category_name: string;
  created_on: ITime;
  image_url: IString;
  status: IStatus;
}

export interface ICategoryResponse extends IResponse {
  payload: ICategory[];
}
