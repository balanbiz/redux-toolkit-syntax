import { useState } from "react";

export function useTextInput(initialValue: string = ""): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e) {
            setValue(e.target.value);
        }
    };
    const clearText = (): void => {
        setValue("");
    };

    return [value, handleChange, clearText];
    // return {value, handleChange, clearText};
}
