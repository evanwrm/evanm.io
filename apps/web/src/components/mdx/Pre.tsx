"use client";

import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Icon from "@/components/Icon";
import { useCopy } from "@/hooks/useCopy";
import { anticipateTransition, fadePopVariants } from "@/lib/animation/framerVariants";
import { cn } from "@/lib/utils/styles";
import { AnimatePresence, m } from "framer-motion";
import { HTMLAttributes, useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLPreElement> {}

const Pre = ({ className, children, ...props }: Props) => {
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);
    const { ref, copy } = useCopy<HTMLDivElement>(() => setCopied(true));

    const onEnter = () => {
        setHovered(true);
    };
    const onExit = () => {
        setHovered(false);
        setCopied(false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (copied)
            timer = setTimeout(() => {
                setCopied(false);
            }, 2000);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [copied]);

    return (
        <div
            ref={ref}
            onMouseEnter={onEnter}
            onMouseLeave={onExit}
            className="relative m-auto my-6 overflow-hidden rounded-xl"
        >
            <AnimatePresence>
                {hovered && (
                    <m.div
                        className="absolute right-4 top-4"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                    >
                        <ResponsiveButton
                            className={cn(
                                "relative flex h-6 w-6 select-none rounded outline outline-1 outline-offset-4",
                                {
                                    "outline-success/80": copied,
                                    "outline-base-content/40": !copied
                                }
                            )}
                            aria-label="Copy code"
                            onClick={copy}
                            tabIndex={0}
                        >
                            <Icon.MdCheckCircleOutline
                                className={cn("absolute h-full w-full transition", {
                                    "text-success/80 opacity-100": copied,
                                    "text-base-content/80 scale-0 opacity-0": !copied
                                })}
                            />
                            <Icon.MdOutlineContentCopy
                                className={cn("absolute h-full w-full transition", {
                                    "text-success/80 scale-0 opacity-0": copied,
                                    "text-base-content/80 opacity-100": !copied
                                })}
                            />
                        </ResponsiveButton>
                    </m.div>
                )}
            </AnimatePresence>
            <pre className={cn(className, "scrollbar")} {...props}>
                {children}
            </pre>
        </div>
    );
};

export default Pre;
