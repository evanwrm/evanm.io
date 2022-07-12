import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Icon from "./Icon";

interface Props {
    className?: string;
}

const ThemeSwap = ({ className }: Props) => {
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
                <Icon icon="MdOutlineLightMode" className="swap-on h-6 w-6" />
                <Icon icon="MdOutlineDarkMode" className="swap-off h-6 w-6" />
            </label>
        </div>
    );
};

export default ThemeSwap;
