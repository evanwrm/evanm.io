import { Transition, Variants } from "framer-motion";

// Variants
export const fadePopVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transitionEnd: { scale: 1, opacity: 1 } }
};

export type SlideDirection = "left" | "right" | "top" | "bottom";
export const slideFadeLeftVariants: Variants = {
    hidden: { x: -25, opacity: 0 },
    visible: { x: 0, opacity: 1, transitionEnd: { x: 0, opacity: 1 } }
};
export const slideFadeRightVariants: Variants = {
    hidden: { x: 25, opacity: 0 },
    visible: { x: 0, opacity: 1, transitionEnd: { x: 0, opacity: 1 } }
};
export const slideFadeTopVariants: Variants = {
    hidden: { y: -75, opacity: 0 },
    visible: { y: 0, opacity: 1, transitionEnd: { y: 0, opacity: 1 } }
};
export const slideFadeBottomVariants: Variants = {
    hidden: { y: 75, opacity: 0 },
    visible: { y: 0, opacity: 1, transitionEnd: { y: 0, opacity: 1 } }
};
export const slideFadeRegistry = {
    left: slideFadeLeftVariants,
    right: slideFadeRightVariants,
    top: slideFadeTopVariants,
    bottom: slideFadeBottomVariants
};

export const slideFadeLeftOffscreenVariants: Variants = {
    hidden: { x: -400, opacity: 0 },
    visible: { x: 0, opacity: 1, transitionEnd: { x: 0, opacity: 1 } }
};
export const buttonVariants: Variants = {
    hover: { scale: 1.1, opacity: 1, y: -4 },
    tap: { scale: 0.9, opacity: 1 }
};

// Transitions
export const lightBounceTransition: Transition = {
    type: "spring",
    duration: 0.5,
    bounce: 0.25
};
export const tweenTransition: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut"
};
export const anticipateTransition: Transition = {
    ease: "anticipate"
};
