"use client";

import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Icon from "@/components/Icon";
import RoundedContainer from "@/components/layouts/RoundedContainer";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { anticipateTransition, fadePopVariants } from "@/lib/animation/framerVariants";
import { Portal } from "@radix-ui/react-portal";
import { AnimatePresence } from "framer-motion";
import React from "react";

const BackToTop = () => {
    const { hidden } = useHideOnScroll(-1, 100, true);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo({ top: 0 });
    };

    return (
        <AnimatePresence>
            {!hidden && (
                <Portal>
                    <ResponsiveButton
                        className="shadow-base-content/10 btn-ghost btn-circle fixed bottom-6 right-8 z-40 flex select-none items-center justify-center bg-clip-padding shadow"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                        onClick={handleClick}
                    >
                        <RoundedContainer>
                            <Icon.MdKeyboardArrowUp className="h-6 w-6" />
                        </RoundedContainer>
                    </ResponsiveButton>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
