import TodoItem from "./TodoItem";
import { useAppSelector } from "../hooks/reduxHooks";

const TodoList: React.FC = () => {
    const todosRedux = useAppSelector(state => state.todos.todos);

    const log = (x: string): any => console.log(x);
    return (
        <ul>
            {log("TodoList render")}
            {todosRedux.map(todo => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
};
export default TodoList;
