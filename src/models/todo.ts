import { fetchTodoList, TodoState } from "../state/slice";

export interface Store {
    todo: TodoState,
    
} 
export interface Todo  {
    id: string;
    title: string;
    description: string;
    created_at: string;
    status: string;
} 

export interface APIResponse<T> {
    data: T;
    error?: any
}

export type APIError<T = any> = { errors: string[] } & T;


export type APIErrorResponse<T=any> = {
    data?: never;
    error: APIError<T>;
}
