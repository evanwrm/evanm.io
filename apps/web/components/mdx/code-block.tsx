"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Terminal } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
    "data-title"?: string;
}
export function Pre({
    className,
    children,
    "data-title": title,
    ...props
}: PreProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timeout = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [copied]);

    const handleCopy = () => {
        navigator.clipboard.writeText(ref.current?.textContent ?? "");
        setCopied(true);
    };

    const copyButton = (
        <div className="absolute top-1.5 right-1.5 z-10 scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <Button
                variant="ghost"
                size="icon"
                aria-label="Copy code"
                onClick={handleCopy}
                className="relative bg-transparent"
            >
                <CheckIcon
                    className={cn("absolute h-6 w-6 transition", {
                        "text-emerald-600 opacity-100": copied,
                        "scale-0 opacity-0": !copied,
                    })}
                />
                <CopyIcon
                    className={cn("absolute h-6 w-6 transition", {
                        "scale-0 text-emerald-600 opacity-0": copied,
                    })}
                />
            </Button>
        </div>
    );
    const preElement = (
        <pre
            {...props}
            className={cn(
                "scrollbar m-0! bg-transparent! p-3 [&>code]:bg-transparent [&>code]:p-0",
                className,
            )}
        >
            {children}
        </pre>
    );

    if (title) {
        return (
            <div ref={ref} className="group relative m-auto">
                <Terminal title={title}>
                    {copyButton}
                    {preElement}
                </Terminal>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="group relative m-auto rounded-md border bg-card shadow-md backdrop-blur-lg"
        >
            {copyButton}
            {preElement}
        </div>
    );
}

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {}
export function Code({ className, ...props }: CodeProps) {
    return (
        <code
            className={cn(
                className,
                "mx-0.5 rounded-md bg-card px-1.5 py-1 before:content-none after:content-none",
            )}
            {...props}
        />
    );
}
