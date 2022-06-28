import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DOM_PORTAL_ID } from "../lib/utils/constants";

interface Props {
    selector?: string;
    children?: React.ReactNode;
}

const Portal: React.FC<Props> = ({ children, selector = DOM_PORTAL_ID }: Props) => {
    const containerRef = useRef<Element>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!containerRef.current)
            containerRef.current = document.querySelector(`#${selector}`) ?? undefined;

        setMounted(true);
    }, [selector]);

    return mounted && containerRef.current ? createPortal(children, containerRef.current) : null;
};

export default Portal;
