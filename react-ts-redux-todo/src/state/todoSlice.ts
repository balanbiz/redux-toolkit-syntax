import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/types";

interface ITodoState {
    todos: ITodo[];
}

const initialState: ITodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodoRedux(state, action: PayloadAction<{ text: string }>) {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                completed: false,
            });
        },
        removeTodoRedux(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => {
                return todo.id !== action.payload;
            });
        },
        toggleTodoCheckboxRedux(state, action: PayloadAction<string>) {
            state.todos.forEach(todo => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed;
                }
            });
        },
    },
});

export const { addTodoRedux, removeTodoRedux, toggleTodoCheckboxRedux } = todoSlice.actions;
export default todoSlice.reducer;
