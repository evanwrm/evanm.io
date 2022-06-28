import { AnimatePresence } from "framer-motion";
import React from "react";
import { useHideOnScroll } from "../hooks/useHideOnScroll";
import { anticipateTransition, fadePopVariants } from "../lib/framerVariants";
import IconButton from "./animations/IconButton";
import Icon from "./Icon";
import RoundedContainer from "./RoundedContainer";

const BackToTop: React.FC = () => {
    const { hidden } = useHideOnScroll(-1, 100, true);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo({ top: 0 });
    };

    return (
        <AnimatePresence>
            {!hidden && (
                <IconButton
                    className="fixed z-40 flex items-center justify-center shadow select-none bg- bg-clip-padding shadow-base-content/10 bottom-6 right-8 btn-ghost btn-circle"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadePopVariants}
                    transition={anticipateTransition}
                    onClick={handleClick}
                >
                    <RoundedContainer>
                        <Icon className="w-6 h-6" icon="MdKeyboardArrowUp"></Icon>
                    </RoundedContainer>
                </IconButton>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
