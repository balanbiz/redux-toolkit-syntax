import TodoItem from "./TodoItem";

import { ITodo } from "../types/types";

interface ITodoListProps {
    todos: ITodo[];
    toggleTodoCheckbox: (id: string) => void;
    removeTodo: (id: string) => void;
}

const TodoList: React.FC<ITodoListProps> = ({ todos, toggleTodoCheckbox, removeTodo }) => {
    const log = (x: string): any => console.log(x);
    return (
        <ul>
            {log("TodoList render")}
            {todos.map(todo => (
                <TodoItem key={todo.id} {...todo} toggleTodoCheckbox={toggleTodoCheckbox} removeTodo={removeTodo} />
            ))}
        </ul>
    );
};
export default TodoList;
