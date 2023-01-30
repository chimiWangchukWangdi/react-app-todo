import { createAction } from "@reduxjs/toolkit";
import { Todo } from "../models/todo";

export const setTodo = createAction("set Todo", (payload: Todo[]) => ({
  payload,
}));
