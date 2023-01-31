import { BoxProps, FlexProps } from "@chakra-ui/react";
import { EntityState } from "@reduxjs/toolkit";
import { ReactText } from "react";
import { IconType } from "react-icons";

export interface Store {
  todo: TodoState;
}
export interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  status: boolean;
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
  title: string;
  description: string;
  created_at: Date;
  status: boolean;
}

export interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface TaskItemProps {
  onClose: () => void;
  open: boolean;
  title: string;
  description: string;
}

export interface TodoState extends EntityState<Todo> {
  loading: "not loaded" | "loading" | "loaded" | "error";
  errors: string[];
}