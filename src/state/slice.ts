import {
  createSlice,
  createEntityAdapter,
  EntityState,
  SliceCaseReducers,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "../models/todo";
import * as actions from "./action";

export const fetchTodoList = createAsyncThunk(
  "getTodos",
  async (_, thunkAPI) => {
    await axios
      .get(
        "https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/list.json"
      )
      .then((res) => {
        const arrayResult = Object.keys(res.data).reduce(
          (result: Todo[], key: string) => {
            result.push({ ...res.data[key], id: key });
            return result;
          },
          []
        );
        return arrayResult;
      })
      .catch((error) => {
        thunkAPI.rejectWithValue(error);
      });
  }
);

export interface TodoState extends EntityState<Todo> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  errors: string[];
}

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo): string => todo.id,
});

export const initialCompaniesState: TodoState = todoAdapter.getInitialState({
  loadingStatus: "not loaded",
  errors: [],
});

export const rentalSlice = createSlice<
  TodoState,
  SliceCaseReducers<TodoState>,
  "todo"
>({
  name: "todo",
  initialState: initialCompaniesState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      actions.setTodo,
      (state: TodoState, action: PayloadAction<Todo[]>) => {
        return todoAdapter.setAll(state, action.payload);
      }
    );
  },
});

export const todoActions = {
  ...rentalSlice.actions,
  fetchTodoList,
};

export default rentalSlice.reducer;
