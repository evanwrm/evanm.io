import clsx from "clsx";
import { m } from "framer-motion";
import React from "react";
import { lightBounceTransition, slideFadeRightOffscreenVariants } from "../lib/framerVariants";
import IconButton from "./animations/IconButton";
import Icon from "./Icon";

interface Props {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

const MobileDrawer: React.FC<Props> = ({ open, onClose, className, children }: Props) => {
    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        onClose();
    };

    return (
        <m.div
            className={clsx(
                className,
                "fixed z-50 left-[-50%] top-0 w-[200%] h-screen shadow bg-base-100 backdrop-blur-lg bg-opacity-60 bg-clip-padding"
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
                const isDraggingRight = offset > 0;
                const threshold = 300 * (isDraggingRight ? 1 / 2 : 2 / 3);

                if (open && offset > threshold) onClose();
                else if (open && offset < -threshold) onClose();
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideFadeRightOffscreenVariants}
            transition={lightBounceTransition}
        >
            <div className="relative flex flex-col items-center justify-start w-full h-screen">
                <div className="z-10 flex items-center justify-start w-1/2 gap-6 p-2">
                    <IconButton
                        className="flex items-center justify-center select-none btn-ghost btn-circle md:hidden"
                        onClick={handleClose}
                        tabIndex={0}
                    >
                        <Icon icon="HiX" className="w-6 h-6" />
                    </IconButton>
                </div>
                <div className="flex items-center justify-center w-1/2 h-full -mt-16">
                    {children}
                </div>
            </div>
        </m.div>
    );
};

export default MobileDrawer;
