"use client";

import ResponsiveButton from "@/components/animation/ResponsiveButton";
import Icon from "@/components/Icon";
import NavLink from "@/components/navigation/NavLink";
import { useBodyLock } from "@/hooks/useBodyLock";
import { slideFadeLeftOffscreenVariants, tweenTransition } from "@/lib/animation/framerVariants";
import { swipePower } from "@/lib/animation/utils";
import { cn } from "@/lib/utils/styles";
import { m, useMotionValue, useTransform } from "framer-motion";
import React from "react";

interface Props {
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

const MobileDrawer = ({ onClose, className, children }: Props) => {
    useBodyLock();
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-400, 0], [0, 0.4]);

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="fixed left-0 top-0 z-50 h-screen w-full select-none">
            <m.div
                className={cn(className, "absolute z-50 -ml-2 w-[18.5rem]")}
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
                transition={tweenTransition}
                style={{
                    x
                }}
            >
                <div className="flex h-screen flex-row">
                    <div className="bg-base-100 relative flex h-full w-11/12 flex-col items-center justify-start">
                        <div className="z-10 flex w-full items-center justify-start p-2">
                            <ResponsiveButton
                                className="btn-ghost btn-circle flex select-none items-center justify-center md:hidden"
                                onClick={handleClose}
                                tabIndex={0}
                            >
                                <Icon.HiX className="h-6 w-6" />
                            </ResponsiveButton>
                            <NavLink
                                href="/"
                                aria-label="Home"
                                className="ml-2 opacity-80 transition-all hover:opacity-100"
                            >
                                <div className="text-base-content inline font-bold">
                                    <span className="text-base-content">evanm</span>
                                    <span className="text-primary">.io</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="-mt-16 flex h-full w-full items-center justify-center">
                            {children}
                        </div>
                    </div>
                    <div
                        className={cn(
                            "absolute right-0.5 h-full w-1/12 flex-1 rounded-r-full",
                            "border-base-300 bg-base-100 border-r border-solid"
                            // "from-base-100/20 border-base-300 to-base-100/20 border-y-2 border-r-2 border-solid bg-gradient-to-r bg-clip-padding backdrop-blur backdrop-saturate-200"
                        )}
                    />
                </div>
            </m.div>
            <m.div
                className="absolute top-0 z-10 h-full w-full bg-black"
                style={{ opacity }}
                onClick={handleClose}
            />
        </div>
    );
};

export default MobileDrawer;
