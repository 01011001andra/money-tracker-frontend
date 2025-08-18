export interface ResponseType<T> {
  message: string;
  status: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
