"use client";

import { Portal } from "@radix-ui/react-portal";
import { AnimatePresence, m } from "framer-motion";
import { useHideOnScroll } from "hooks/use-scroll";
import { ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    anticipateTransition,
    fadePopVariants,
} from "@/lib/animation/framer-variants";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

const BackToTop = ({ className }: Props) => {
    const { hidden } = useHideOnScroll({
        threshold: -1,
        showThreshold: 100,
        invert: true,
    });

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo({ top: 0 });
    };

    return (
        <AnimatePresence>
            {!hidden && (
                <Portal>
                    <m.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                        className={cn(
                            "group fixed right-8 bottom-6 z-40",
                            className,
                        )}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleClick}
                        >
                            <ChevronUpIcon className="h-6 w-6 transition group-hover:-translate-y-1" />
                        </Button>
                    </m.div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
