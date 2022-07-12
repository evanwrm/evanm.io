import copy from "clipboard-copy";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { anticipateTransition, fadePopVariants } from "../lib/framerVariants";
import ResponsiveButton from "./animations/ResponsiveButton";
import Icon from "./Icon";

interface Props extends HTMLAttributes<HTMLPreElement> {}

const Pre = ({ className, children, ...props }: Props) => {
    const textInput = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const onEnter = () => {
        setHovered(true);
    };
    const onExit = () => {
        setHovered(false);
        setCopied(false);
    };

    const onCopy = () => {
        if (textInput?.current?.textContent) {
            copy(textInput.current.textContent);
            setCopied(true);
        }
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
            ref={textInput}
            onMouseEnter={onEnter}
            onMouseLeave={onExit}
            className="relative mx-0 my-6 overflow-hidden rounded-xl"
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
                            className={clsx(
                                "relative flex h-6 w-6 select-none rounded outline outline-1 outline-offset-4",
                                {
                                    "outline-success/80": copied,
                                    "outline-base-content/40": !copied
                                }
                            )}
                            aria-label="Copy code"
                            onClick={onCopy}
                            tabIndex={0}
                        >
                            <Icon
                                icon="MdCheckCircleOutline"
                                className={clsx("absolute h-full w-full transition", {
                                    "text-success/80 opacity-100": copied,
                                    "text-base-content/80 scale-0 opacity-0": !copied
                                })}
                            />
                            <Icon
                                icon="MdOutlineContentCopy"
                                className={clsx("absolute h-full w-full transition", {
                                    "text-success/80 scale-0 opacity-0": copied,
                                    "text-base-content/80 opacity-100": !copied
                                })}
                            />
                        </ResponsiveButton>
                    </m.div>
                )}
            </AnimatePresence>
            <pre className={clsx(className, "scrollbar")} {...props}>
                {children}
            </pre>
        </div>
    );
};

export default Pre;
