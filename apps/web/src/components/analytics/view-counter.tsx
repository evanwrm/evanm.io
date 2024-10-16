"use client";

import { trpc } from "@/lib/utils/trpc";
import { useEffect } from "react";

interface Props {
    documentId: string;
}

const ViewCounter = ({ documentId }: Props) => {
    const { mutate } = trpc.articles.incrementViews.useMutation();
    useEffect(() => {
        const registerView = async () => {
            try {
                mutate({ documentId });
            } catch (error) {
                console.error("Failed to register view", error);
            }
        };
        registerView();
    }, [documentId, mutate]);

    return null;
};

export default ViewCounter;
