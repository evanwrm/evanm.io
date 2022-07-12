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
                        className="absolute right-2 top-2"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                    >
                        <ResponsiveButton
                            className={clsx("flex select-none rounded-lg border p-1.5", {
                                "border-success/40": copied,
                                "border-base-content/40": !copied
                            })}
                            aria-label="Copy code"
                            onClick={onCopy}
                            tabIndex={0}
                        >
                            <Icon
                                icon={copied ? "MdCheckCircleOutline" : "MdOutlineContentCopy"}
                                className={clsx("h-6 w-6 transition-colors", {
                                    "text-success/80": copied,
                                    "text-base-content/80": !copied
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
