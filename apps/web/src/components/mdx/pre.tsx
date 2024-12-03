"use client";

import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { anticipateTransition, fadePopVariants } from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { AnimatePresence, delay, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLPreElement> {}

export const Pre = ({ className, children, ...props }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => delay(() => setCopied(false), 2000), [copied]);

    const onEnter = () => {
        setHovered(true);
    };
    const onExit = () => {
        setHovered(false);
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(ref.current?.textContent ?? "");
        setCopied(true);
    };

    return (
        <div
            ref={ref}
            onMouseEnter={onEnter}
            onMouseLeave={onExit}
            className="relative m-auto my-6 overflow-hidden rounded-md"
        >
            <AnimatePresence>
                {hovered && (
                    <m.div
                        className="absolute right-2 top-2"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                    >
                        <HoverButton>
                            <Button
                                variant="secondary"
                                size="icon"
                                aria-label="Copy code"
                                onClick={handleCopy}
                                className="relative bg-transparent"
                            >
                                <Icon.MdCheckCircleOutline
                                    className={cn("absolute h-6 w-6 transition", {
                                        "text-lime-600 opacity-100": copied,
                                        "scale-0 opacity-0": !copied
                                    })}
                                />
                                <Icon.MdOutlineContentCopy
                                    className={cn("absolute h-6 w-6 transition", {
                                        "scale-0 text-lime-600 opacity-0": copied
                                    })}
                                />
                            </Button>
                        </HoverButton>
                    </m.div>
                )}
            </AnimatePresence>
            <pre className={cn("scrollbar", className)} {...props}>
                {children}
            </pre>
        </div>
    );
};
