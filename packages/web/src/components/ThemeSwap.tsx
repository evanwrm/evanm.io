import clsx from "clsx";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
            <label className="swap swap-rotate opacity-80 transition hover:-translate-y-1 hover:scale-105 hover:opacity-100 hover:text-primary focus:text-primary">
                <input
                    type="checkbox"
                    aria-label="Theme swap"
                    checked={checked}
                    onChange={handleTheme}
                />
                <MdOutlineLightMode className="swap-on w-6 h-6" />
                <MdOutlineDarkMode className="swap-off w-6 h-6" />
            </label>
        </div>
    );
};

export default ThemeSwap;
