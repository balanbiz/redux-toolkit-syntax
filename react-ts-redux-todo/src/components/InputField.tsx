import { useRef, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addTodoRedux } from "../state/todoSlice";

const InputField: React.FC = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");

    const addTodo = () => {
        if (text.trim().length !== 0) {
            dispatch(addTodoRedux({ text }));
            setText("");
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const log = (x: string): any => console.log(x);
    return (
        <label htmlFor="">
            {log("InputField render")}
            <input ref={inputRef} value={text} onKeyDown={e => handleKeyDown(e)} onChange={e => setText(e.target.value)} />
            <button onClick={addTodo}>Add todo</button>
        </label>
    );
};
export default InputField;
