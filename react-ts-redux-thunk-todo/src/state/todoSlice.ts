import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/types";

// Types------------------------------------

enum ETodoStatus {
    LOADING = "loading",
    RESOLVED = "resolved",
    REJECTED = "rejected",
}

interface ITodoState {
    todos: ITodo[];
    status: ETodoStatus | null;
    error: string | null;
}

interface ITodoServer {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

// Variables--------------------------------------

const initialState: ITodoState = {
    todos: [],
    status: null,
    error: null,
};

//functions---------------------------------

export const fetchTodosAsync = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>("todos/fetchTodosAsync", async (_, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");

    if (!response.ok) {
        return rejectWithValue("Can't load todos, server error");
    }
    const fetchedTodos: unknown = await response.json();
    const modifiedFetchdTodos: ITodo[] = [];

    if (fetchedTodos && Array.isArray(fetchedTodos)) {
        fetchedTodos.forEach((obj: ITodoServer) => {
            const keyValue = obj.title;
            const newObject = { id: obj.id, text: keyValue, completed: obj.completed };
            modifiedFetchdTodos.push(newObject);
        });
    }
    return modifiedFetchdTodos as ITodo[];
});

export const removeTodoAsync = createAsyncThunk<number, number, { rejectValue: string }>("todos/removeTodoAsync", async function (id, { rejectWithValue }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        return rejectWithValue("Can't delete task. Server error.");
    }

    return id;
});

export const toggleTodoCheckboxAsync = createAsyncThunk<ITodo, number, { rejectValue: string; state: { todos: ITodoState } }>(
    "todos/toggleTodoCheckboxAsync",
    async function (id, { rejectWithValue, getState }) {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            });

            if (!response.ok) {
                return rejectWithValue("Can't toggle status. Server error.");
            }

            return (await response.json()) as ITodo;
        } else {
            return rejectWithValue("No such todo in todo list");
        }
    }
);

export const addNewTodoAsync = createAsyncThunk<ITodo, { text: string }, { rejectValue: string }>(
    "todos/addNewTodoAsync",
    async function (text, { rejectWithValue }) {
        const todo: ITodo = {
            id: Number(new Date()),
            text: text.text,
            completed: false,
        };

        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            rejectWithValue("Can't add task. Server error.");
        }

        return (await response.json()) as ITodo;
    }
);

/* const setError = (state: ITodoState, action: PayloadAction<string>) => {
    state.status = ETodoStatus.REJECTED;
    state.error = action.payload;
} */

const isError = (action: AnyAction) => {
    return action.type.endsWith("rejected");
};

// Slice-------------------------------------

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodoRedux(state, action: PayloadAction<{ text: string }>) {
            state.todos.push({
                id: Number(new Date()),
                text: action.payload.text,
                completed: false,
            });
        },
        removeTodoRedux(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(todo => {
                return todo.id !== action.payload;
            });
        },
        toggleTodoCheckboxRedux(state, action: PayloadAction<number>) {
            state.todos.forEach(todo => {
                if (todo.id === action.payload) {
                    todo.completed = !todo.completed;
                }
            });
        },
    },
    /* {
        [fetchTodosAsync.pending]: (state: ITodoState) => {
        state.status = ETodoStatus.LOADING;
        state.error = null;
        },
        [fetchTodosAsync.fulfilled]: (state: ITodoState, action: PayloadAction<ITodo[]>) => {
            state.status = ETodoStatus.RESOLVED;
            state.todos = action.payload;
        },
        [fetchTodosAsync.rejected]: setError,
        [deleteTodoAsync.rejected]: setError,
        [toggleStatusAsync.rejected]: setError,
    }, */
    extraReducers: builder => {
        builder
            .addCase(fetchTodosAsync.pending, state => {
                state.status = ETodoStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = ETodoStatus.RESOLVED;
            })
            .addCase(addNewTodoAsync.pending, state => {
                state.error = null;
            })
            .addCase(addNewTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleTodoCheckboxAsync.fulfilled, (state, action) => {
                state.todos.forEach(todo => {
                    console.log(todo.id, action.payload.id);
                    if (todo.id === action.payload.id) {
                        todo.completed = !todo.completed;
                    }
                });
            })
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => {
                    return todo.id !== action.payload;
                });
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = null;
            });
    },
});

export const { addTodoRedux, removeTodoRedux, toggleTodoCheckboxRedux } = todoSlice.actions;
export default todoSlice.reducer;
