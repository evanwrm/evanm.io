"use client";

import { useEffect } from "react";
import { articleIncrementViews } from "@/lib/services/sanity/actions";

interface Props {
    documentId: string;
}

const ViewCounter = ({ documentId }: Props) => {
    useEffect(() => {
        articleIncrementViews({ documentId }).catch(e =>
            console.error("Failed to register view", e),
        );
    }, [documentId]);

    return null;
};

export default ViewCounter;
