import clsx from "clsx";
import { m } from "framer-motion";
import React from "react";
import { lightBounceTransition, slideFadeLeftOffscreenVariants } from "../../lib/framerVariants";
import ResponsiveButton from "../animations/ResponsiveButton";
import Icon from "../Icon";

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

const MobileDrawer = ({ open, onClose, className, children }: Props) => {
    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <m.div
            className={clsx(
                className,
                "bg-base-100 fixed left-[-50%] top-0 z-50 h-screen w-[200%] select-none bg-opacity-60 bg-clip-padding shadow backdrop-blur backdrop-saturate-200"
            )}
            drag="x"
            dragElastic={0.1}
            dragMomentum={false}
            dragConstraints={{
                left: 0.1,
                right: 0.1
            }}
            onDragEnd={(_event, info) => {
                const offset = info.delta.x - info.offset.x;
                const isDraggingLeft = offset > 0;
                const threshold = 300 * (isDraggingLeft ? 1 / 2 : Infinity);

                if (open && offset > threshold) onClose();
                else if (open && offset < -threshold) onClose();
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideFadeLeftOffscreenVariants}
            transition={lightBounceTransition}
        >
            <div className="relative flex h-screen w-full flex-col items-center justify-start">
                <div className="z-10 flex w-1/2 items-center justify-start gap-6 p-2">
                    <ResponsiveButton
                        className="btn-ghost btn-circle flex select-none items-center justify-center md:hidden"
                        onClick={handleClose}
                        tabIndex={0}
                    >
                        <Icon icon="HiX" className="h-6 w-6" />
                    </ResponsiveButton>
                </div>
                <div className="-mt-16 flex h-full w-1/2 items-center justify-center">
                    {children}
                </div>
            </div>
        </m.div>
    );
};

export default MobileDrawer;
