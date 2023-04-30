import { useRef, useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
// import { addTodoRedux } from "../state/todoSlice";
import { addNewTodoAsync } from "../state/todoSlice";
import { useTextInput } from "../hooks/useInput";

const InputField: React.FC = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    // const [text, setText] = useState("");
    const [text, setText, clearText] = useTextInput();

    const addTodo = () => {
        if (text.trim().length !== 0) {
            // dispatch(addTodoRedux({ text }));
            dispatch(addNewTodoAsync({ text }));

            clearText();
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
            <input ref={inputRef} value={text} onKeyDown={e => handleKeyDown(e)} onChange={setText} />
            <button onClick={addTodo}>Add todo</button>
        </label>
    );
};
export default InputField;
