import { memo } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { toggleTodoCheckboxRedux, removeTodoRedux } from "../state/todoSlice";
import { ITodo } from "../types/types";

function memoPropsCompare(prevProps: ITodo, nextProps: ITodo) {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

const TodoItem: React.FC<ITodo> = memo(({ id, text, completed }) => {
    const dispatch = useAppDispatch();

    const log = (x: string): any => console.log(x);
    return (
        <li>
            {log(`TodoItem ${id} render`)}
            <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoCheckboxRedux(id))} />
            <span>{text}</span>
            <span onClick={() => dispatch(removeTodoRedux(id))} className="delete">
                &times;
            </span>
        </li>
    );
}, memoPropsCompare);
export default TodoItem;
