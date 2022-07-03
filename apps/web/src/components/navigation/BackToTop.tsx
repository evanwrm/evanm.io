import Portal from "@reach/portal";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import { anticipateTransition, fadePopVariants } from "../../lib/framerVariants";
import ResponsiveButton from "../animations/ResponsiveButton";
import Icon from "../Icon";
import RoundedContainer from "../RoundedContainer";

const BackToTop: React.FC = () => {
    const { hidden } = useHideOnScroll(-1, 100, true);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo({ top: 0 });
    };

    return (
        <Portal>
            <AnimatePresence>
                {!hidden && (
                    <ResponsiveButton
                        className="bg- shadow-base-content/10 btn-ghost btn-circle fixed bottom-6 right-8 z-40 flex select-none items-center justify-center bg-clip-padding shadow"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadePopVariants}
                        transition={anticipateTransition}
                        onClick={handleClick}
                    >
                        <RoundedContainer>
                            <Icon className="h-6 w-6" icon="MdKeyboardArrowUp"></Icon>
                        </RoundedContainer>
                    </ResponsiveButton>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default BackToTop;
