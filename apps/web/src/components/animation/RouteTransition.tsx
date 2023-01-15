"use client";

import { AnimatePresence } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

const RouteTransition = ({ children }: Props) => {
    return <AnimatePresence>{children}</AnimatePresence>;
};

export default RouteTransition;
