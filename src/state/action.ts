import { createAction } from "@reduxjs/toolkit";
import { Todo } from "../models/todo";

export const setTodo = createAction("set Todo", (payload: Todo[]) => ({
  payload,
}));
export const onAddTodo = createAction("create Todo", (payload) => ({
  payload,
}));
export const onEditTodo = createAction("edit Todo", (payload) => ({ payload }));
export const onDeleteTodo = createAction("delete Todo", (payload) => ({
  payload,
}));
