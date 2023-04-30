import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import InputField from "./components/InputField";

import { ITodo } from "./types/types";

const App: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [text, setText] = useState("");

    const addTodo = () => {
        if (text.trim().length !== 0) {
            setTodos([
                ...todos,
                {
                    id: new Date().toISOString(),
                    text,
                    completed: false,
                },
            ]);
            setText("");
        }
    };

    const removeTodo = (id: string): void => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    };

    const toggleTodoCheckbox = (id: string): void => {
        setTodos(todos =>
            todos.map(todo => {
                if (id !== todo.id) {
                    return todo;
                } else {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
            })
        );
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    const log = (x: string): any => console.log(x);
    return (
        <div className="App">
            {log("App render")}
            <InputField text={text} addTodo={addTodo} setText={setText} handleKeyDown={handleKeyDown} />
            <TodoList todos={todos} removeTodo={removeTodo} toggleTodoCheckbox={toggleTodoCheckbox} />
        </div>
    );
};

export default App;
