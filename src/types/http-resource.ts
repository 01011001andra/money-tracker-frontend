export type Meta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface ResponseType<T> {
  message: string;
  status: string;
  data: T;
  meta?: Meta;
}
