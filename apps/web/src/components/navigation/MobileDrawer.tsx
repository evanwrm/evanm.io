"use client";

import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Icon from "@/components/Icon";
import { useBodyLock } from "@/hooks/useBodyLock";
import {
    lightBounceTransition,
    slideFadeLeftOffscreenVariants
} from "@/lib/animation/framerVariants";
import { swipePower } from "@/lib/animation/utils";
import { cn } from "@/lib/utils/styles";
import { m } from "framer-motion";
import React from "react";

interface Props {
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

const MobileDrawer = ({ onClose, className, children }: Props) => {
    useBodyLock();

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <m.div
            className={cn(
                className,
                "bg-base-100 fixed left-0 top-0 z-50 h-screen w-full select-none bg-opacity-60 bg-clip-padding shadow backdrop-blur backdrop-saturate-200"
            )}
            drag="x"
            dragElastic={{ left: 1, right: 0.005 }}
            dragMomentum={false}
            dragConstraints={{
                left: 0,
                right: 0
            }}
            onDragEnd={(_event, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                const isDraggingLeft = swipe < 0;
                const threshold = 25000 * (isDraggingLeft ? -1 : 50);

                if (isDraggingLeft && swipe < threshold) onClose();
                else if (!isDraggingLeft && swipe > threshold) onClose();
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideFadeLeftOffscreenVariants}
            transition={lightBounceTransition}
        >
            <div className="relative flex h-screen w-full flex-col items-center justify-start">
                <div className="z-10 flex w-full items-center justify-start gap-6 p-2">
                    <ResponsiveButton
                        className="btn-ghost btn-circle flex select-none items-center justify-center md:hidden"
                        onClick={handleClose}
                        tabIndex={0}
                    >
                        <Icon.HiX className="h-6 w-6" />
                    </ResponsiveButton>
                </div>
                <div className="-mt-16 flex h-full w-full items-center justify-center">
                    {children}
                </div>
            </div>
        </m.div>
    );
};

export default MobileDrawer;
