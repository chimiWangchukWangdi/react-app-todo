import {
  createSlice,
  createEntityAdapter,
  EntityState,
  SliceCaseReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "../models/todo";
import * as actions from "./action";

export const fetchTodoList = createAsyncThunk(
  "getTodos",
  async (_, thunkAPI) => {
    return await axios
      .get(
        "https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
      )
      .then((res) => {
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const postTodo = createAsyncThunk(
  "add Todo",
  async (data: Todo, thunkAPI) => {
    return await axios
      .post(
        "https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        data
      )
      .then((res) => {
        return thunkAPI.fulfillWithValue(data);
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const editTodo = createAsyncThunk(
  "edit Todo",
  async (values: Todo, thunkAPI) => {
    return await axios
      .put(
        `https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${values.id}.json`,
        values
      )
      .then((res) => {
        return thunkAPI.fulfillWithValue(res.data);
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export const deleteTodo = createAsyncThunk(
  "delete Todo",
  async (id: string, thunkAPI) => {
    return await axios
      .delete(
        `https://task-manager-8b118-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`
      )
      .then((res) => {
        return thunkAPI.fulfillWithValue(id);
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue(error);
      });
  }
);

export interface TodoState extends EntityState<Todo> {
  loading: "not loaded" | "loading" | "loaded" | "error";
  errors: string[];
}

export const todoAdapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo): string => todo.id,
});

export const initialCompaniesState: TodoState = todoAdapter.getInitialState({
  loading: "not loaded",
  errors: [],
});

export const todoSlice = createSlice<
  TodoState,
  SliceCaseReducers<TodoState>,
  "todo"
>({
  name: "todo",
  initialState: initialCompaniesState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        // to change the incoming json object to array
        const arrayResult = Object.keys(action.payload).reduce(
          (result: Todo[], key: string) => {
            result.push({ ...action.payload[key], id: key });
            return result;
          },
          []
        );
        todoAdapter.setAll(state, arrayResult);
        state.loading = "loaded";
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        const error = [action?.error?.message ? "error" : "error"];
        state.errors.push(...error);
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action);
        state.loading = "loaded";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        todoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.payload);
      });
  },
});

export const todoActions = {
  ...todoSlice.actions,
  fetchTodoList,
};

export default todoSlice.reducer;
