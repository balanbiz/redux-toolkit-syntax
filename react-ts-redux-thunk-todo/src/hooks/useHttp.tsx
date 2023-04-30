import { useCallback, useState } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState<"waiting" | "loading" | "error">("waiting");

    const request = useCallback(
        async (
            url: string,
            method: string = "GET",
            body: BodyInit | null | undefined = null,
            headers: HeadersInit | undefined = { "Content-Type": "application/json" }
        ) => {
            setProcess("loading");

            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();

                return data;
            } catch (e) {
                setProcess("error");
                throw e;
            }
        },
        []
    );

    const clearError = useCallback(() => {
        setProcess("loading");
    }, []);

    return { request, clearError, process, setProcess };
};
