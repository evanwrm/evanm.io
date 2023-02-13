"use client";

import { trpc } from "@/lib/utils/trpc";
import { useEffect } from "react";

interface Props {
    documentId: string;
}

const ViewCounter = ({ documentId }: Props) => {
    const mutation = trpc.articles.incrementViews.useMutation();
    useEffect(() => {
        const registerView = async () => {
            mutation.mutate({ documentId });
        };
        registerView();
    }, [documentId]);

    return null;
};

export default ViewCounter;
