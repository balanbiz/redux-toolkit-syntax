import { memo } from "react";
import { ITodo } from "../types/types";

interface ITodoItemProps extends ITodo {
    toggleTodoCheckbox: (id: string) => void;
    removeTodo: (id: string) => void;
}

function memoPropsCompare(prevProps: ITodoItemProps, nextProps: ITodoItemProps) {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

const TodoItem: React.FC<ITodoItemProps> = memo(({ id, text, completed, toggleTodoCheckbox, removeTodo }) => {
    const log = (x: string): any => console.log(x);
    return (
        <li>
            {log(`TodoItem ${id} render`)}
            <input type="checkbox" checked={completed} onChange={() => toggleTodoCheckbox(id)} />
            <span>{text}</span>
            <span onClick={() => removeTodo(id)} className="delete">
                &times;
            </span>
        </li>
    );
}, memoPropsCompare);
export default TodoItem;
