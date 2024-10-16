"use client";

import { Icon } from "@/components/icon";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
    className?: string;
}

export const ThemeButton = ({ className }: Props) => {
    const { resolvedTheme, setTheme } = useTheme();
    const checked = resolvedTheme === "dark";

    const handleTheme = () => {
        setTheme(checked ? "light" : "dark");
    };

    return (
        <Toggle
            pressed={checked}
            onPressedChange={handleTheme}
            className={cn("!text-foreground flex !bg-transparent p-0", className)}
        >
            {checked ? <Icon.MoonIcon className="h-6 w-6" /> : <Icon.SunIcon className="h-6 w-6" />}
        </Toggle>
    );
};

export const ThemeSwitch = ({ id }: { id: string }) => {
    const { resolvedTheme, setTheme } = useTheme();
    const checked = resolvedTheme === "dark";
    const tooltipLabel = checked ? "Dark" : "Light";

    const handleTheme = () => {
        setTheme(checked ? "light" : "dark");
    };

    return (
        <>
            <Switch id={id} checked={checked} onClick={handleTheme} />
            <Label htmlFor={id}>{tooltipLabel}</Label>
        </>
    );
};

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleTheme = (value: string) => {
        if (value) setTheme(value);
    };

    if (!mounted) return null;

    return (
        <ToggleGroup type="single" size="sm" value={theme} onValueChange={handleTheme}>
            <Tooltip>
                <ToggleGroupItem value="dark" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <Icon.MoonIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>Dark</TooltipContent>
            </Tooltip>
            <Tooltip>
                <ToggleGroupItem value="light" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <Icon.SunIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>Light</TooltipContent>
            </Tooltip>
            <Tooltip>
                <ToggleGroupItem value="system" className="rounded-full" asChild>
                    <TooltipTrigger>
                        <Icon.DesktopIcon className="h-4 w-4" />
                    </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent>System</TooltipContent>
            </Tooltip>
        </ToggleGroup>
    );
};
