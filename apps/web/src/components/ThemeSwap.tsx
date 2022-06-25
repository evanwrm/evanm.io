import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Icon from "./Icon";

interface Props {
    className?: string;
}

const ThemeSwap: React.FC<Props> = ({ className }: Props) => {
    const { resolvedTheme, setTheme } = useTheme();
    const [checked, setChecked] = useState(resolvedTheme === "dark");

    const handleTheme = () => {
        setTheme(checked ? "light" : "dark");
        setChecked(!checked);
    };

    // Sync
    useEffect(() => {
        setChecked(resolvedTheme === "dark");
    }, [resolvedTheme]);

    return (
        <div
            className={clsx(
                className,
                "tooltip tooltip-bottom",
                "hover:before:delay-1000 hover:before:content-[attr(data-tip)]"
            )}
            data-tip={checked ? "Light Mode" : "Dark Mode"}
        >
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    aria-label="Theme swap"
                    checked={checked}
                    onChange={handleTheme}
                />
                <Icon icon="MdOutlineLightMode" className="w-6 h-6 swap-on" />
                <Icon icon="MdOutlineDarkMode" className="w-6 h-6 swap-off" />
            </label>
        </div>
    );
};

export default ThemeSwap;
