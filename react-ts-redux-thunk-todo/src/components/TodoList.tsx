import TodoItem from "./TodoItem";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchTodosAsync } from "../state/todoSlice";

const TodoList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { todos, status, error } = useAppSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch]);

    const log = (x: string): any => console.log(x);
    return (
        <ul>
            {log("TodoList render")}
            {status === "loading" && <h4>Loading...///</h4>}
            {error && <h4>{error}</h4>}
            {todos.map(todo => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
};
export default TodoList;
