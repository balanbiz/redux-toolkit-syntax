import { useRef, useEffect } from "react";

interface IInputFieldTodo {
    text: string;
    setText: (e: string) => void;
    addTodo: () => void;
    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const InputField: React.FC<IInputFieldTodo> = ({ text, setText, addTodo, handleKeyDown }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const log = (x: string): any => console.log(x);
    return (
        <label htmlFor="">
            {log("InputFieldRender")}
            <input ref={inputRef} value={text} onKeyDown={e => handleKeyDown(e)} onChange={e => setText(e.target.value)} />
            <button onClick={addTodo}>Add todo</button>
        </label>
    );
};
export default InputField;
