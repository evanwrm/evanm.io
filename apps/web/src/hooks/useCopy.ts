import copy from "clipboard-copy";
import { useRef } from "react";

export const useCopy = <T extends HTMLElement>(copyCallback?: (content: string) => void) => {
    const ref = useRef<T>(null);

    const onCopy = () => {
        if (ref?.current?.textContent) {
            const content = ref.current.textContent;
            copy(content);
            copyCallback && copyCallback(content);
        }
    };

    return { ref, copy: onCopy };
};
