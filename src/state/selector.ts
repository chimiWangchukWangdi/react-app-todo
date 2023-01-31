import { createSelector } from "@reduxjs/toolkit";
import { TodoState } from "../models/todo";
import { todoAdapter } from './slice'

export const selectState = (state: {todo: TodoState}) => (state.todo);
export const { selectAll, selectById, selectEntities, selectIds, selectTotal } = todoAdapter.getSelectors()
export const selectTodos = createSelector(selectState, selectAll);
export const selectAllIds = createSelector(selectState, selectIds)
export const selectAllEntities = createSelector(selectState, selectEntities, (state) => state)
 