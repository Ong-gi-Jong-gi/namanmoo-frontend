export interface responseRoot<T> {
  status: string;
  message: string;
  data: T;
}
