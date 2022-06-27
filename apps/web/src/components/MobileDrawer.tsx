import clsx from "clsx";
import { m } from "framer-motion";
import React from "react";
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

                console.log(info);

                if (open && offset > threshold) onClose();
                else if (open && offset < -threshold) onClose();
            }}
            initial={{ opacity: 0, x: 399 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 399 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
        >
            <div className="relative flex flex-col items-center justify-start w-full h-screen">
                <div className="z-10 flex items-center justify-start w-1/2 gap-6 p-2">
                    <div
                        className="btn btn-ghost btn-circle md:hidden"
                        onClick={handleClose}
                        tabIndex={0}
                    >
                        <Icon icon="HiX" className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex items-center justify-center w-1/2 h-full -mt-16">
                    {children}
                </div>
            </div>
        </m.div>
    );
};

export default MobileDrawer;
