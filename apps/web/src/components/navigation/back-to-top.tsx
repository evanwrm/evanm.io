"use client";

import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useHideOnScroll } from "@/hooks/use-scroll";
import { anticipateTransition, fadePopVariants } from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";
import { Portal } from "@radix-ui/react-portal";
import { AnimatePresence } from "framer-motion";
import React from "react";

interface Props {
    className?: string;
}

const BackToTop = ({ className }: Props) => {
    const { hidden } = useHideOnScroll({ threshold: -1, showThreshold: 100, invert: true });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo({ top: 0 });
    };

    return (
        <AnimatePresence>
            {!hidden && (
                <Portal>
                    <HoverButton
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                        className={cn("group fixed bottom-6 right-8 z-40", className)}
                    >
                        <Button variant="outline" size="icon" onClick={handleClick}>
                            <Icon.MdKeyboardArrowUp className="h-6 w-6 transition group-hover:-translate-y-1" />
                        </Button>
                    </HoverButton>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
