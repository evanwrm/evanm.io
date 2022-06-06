import clsx from "clsx";
import React from "react";
import NavLink from "./NavLink";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    routes: { path: string; label: string }[];
    onElementClick?: React.MouseEventHandler;
    className?: string;
}

const RouteNavList: React.FC<Props> = ({ routes, className, onElementClick, ...props }) => {
    return (
        <ul className={clsx(className)} {...props}>
            {routes.map(route => (
                <li className="px-4 py-2" key={route.path}>
                    <NavLink
                        href={route.path}
                        aria-label={route.label}
                        onClick={onElementClick}
                        className="opacity-80 hover:opacity-100 font-bold transition-[background-size] link-underline bg-gradient-to-r from-secondary/20 to-secondary/80"
                    >
                        {route.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default RouteNavList;
