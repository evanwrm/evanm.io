"use client";

import { articleIncrementViews } from "@/lib/services/sanity/actions";
import { useEffect } from "react";

interface Props {
    documentId: string;
}

const ViewCounter = ({ documentId }: Props) => {
    useEffect(() => {
        articleIncrementViews({ documentId }).catch(e =>
            console.error("Failed to register view", e)
        );
    }, [documentId]);

    return null;
};

export default ViewCounter;
