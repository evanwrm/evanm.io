"use client";

import { articleIncrementViews } from "@/lib/services/api";
import { useEffect } from "react";

interface Props {
    documentId: string;
}

const ViewCounter = ({ documentId }: Props) => {
    useEffect(() => {
        const registerView = () => {
            articleIncrementViews({ documentId }).catch(e =>
                console.error("Failed to register view", e)
            );
        };
        registerView();
    }, [documentId]);

    return null;
};

export default ViewCounter;
