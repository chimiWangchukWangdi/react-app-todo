import { TodoState } from "../state/slice";

export interface Store {
  todo: TodoState;
}
export interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
}

export interface APIResponse<T> {
  data: T;
  error?: any;
}

export type APIError<T = any> = { errors: string[] } & T;

export type APIErrorResponse<T = any> = {
  data?: never;
  error: APIError<T>;
};

export interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  toEditTitle?: string;
  toEditDescription?: string;
}

export interface ModalProps {
  open: boolean;
  modalLable: string;
  children: React.ReactNode;
  custom_modal?: string;
  onClose: () => void;
}

export interface TaskProps {
  id: string;
  completed: boolean;
  title: string;
  description: string;
}
