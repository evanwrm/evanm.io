import clsx from "clsx";
import React from "react";
import NavLink from "./NavLink";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
    routes: { path: string; label: string }[];
    onElementClick?: React.MouseEventHandler;
    className?: string;
}

const RouteNavList = ({ routes, className, onElementClick, ...props }: Props) => {
    return (
        <ul className={clsx(className)} {...props}>
            {routes.map(route => (
                <li className="px-4 py-2" key={route.path}>
                    <NavLink
                        href={route.path}
                        aria-label={route.label}
                        onClick={onElementClick}
                        className="link-underline from-secondary/20 to-secondary/80 rounded bg-gradient-to-r font-bold opacity-80 transition-[background-size] hover:opacity-100"
                    >
                        {route.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default RouteNavList;
