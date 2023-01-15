import Icon from "@/components/Icon";
import { cn } from "@/lib/utils/styles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
    className?: string;
}

const ThemeToggle = ({ className }: Props) => {
    const { resolvedTheme, setTheme } = useTheme();
    const [tooltipLabel, setTooltipLabel] = useState("");
    const checked = resolvedTheme === "dark";

    const handleTheme = () => {
        setTheme(checked ? "light" : "dark");
    };

    useEffect(() => {
        setTooltipLabel(checked ? "Light Mode" : "Dark Mode");
    }, [checked]);

    return (
        <div
            className={cn(
                className,
                "tooltip tooltip-bottom",
                "hover:before:delay-1000 hover:before:content-[attr(data-tip)]"
            )}
            data-tip={tooltipLabel}
        >
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    aria-label="Theme swap"
                    checked={checked}
                    onChange={handleTheme}
                />
                <Icon.MdOutlineLightMode className="swap-on h-6 w-6" />
                <Icon.MdOutlineDarkMode className="swap-off h-6 w-6" />
            </label>
        </div>
    );
};

export default ThemeToggle;
