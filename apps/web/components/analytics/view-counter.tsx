import { actions } from "astro:actions";
import { useEffect } from "react";

interface Props {
    documentId: string;
}
export default function ViewCounter({ documentId }: Props) {
    useEffect(() => {
        actions
            .incrementViews({ documentId })
            .catch(e => console.error("Failed to register view", e));
    }, [documentId]);

    return null;
}
