"use client";

import { HoverButton } from "@/components/animation/hover-button";
import { getIcon, Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { delay } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SpotlightAction = {
    id: string;
    title: string;
    subtitle?: string;
    section?: string;
    parent?: string;
    shortcut: string[];
    keywords: string[];
    icon: string;
    command?: () => unknown;
};

interface Props {
    items: SpotlightAction[];
    className?: string;
}
export function Spotlight({ items, className }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [stack, setStack] = useState<SpotlightAction[]>([]);
    const activeParent = useMemo(
        () => (stack.length === 0 ? undefined : stack[stack.length - 1]),
        [stack]
    );
    const groupedItems = useMemo(() => {
        const currentItems = filterActive(items, activeParent?.id);
        return groupActions(currentItems);
    }, [items, activeParent]);

    const popStack = () => {
        if (stack.length === 0) bounce();
        else setStack(stack => stack.slice(0, stack.length - 1));
    };
    const pushStack = (item: SpotlightAction) => {
        setStack(stack => [...stack, item]);
        bounce();
    };

    const handleOpenChange = useCallback((open: boolean) => {
        if (open) {
            setSearch("");
            setStack([]);
            setOpen(true);
            bounce();
        } else {
            setOpen(false);
        }
    }, []);

    const runCommand = (item: SpotlightAction) => {
        if (filterActive(items, item.id).length > 0) {
            pushStack(item);
            item.command?.();
            setSearch("");
            return;
        }
        if (!item.command) return;
        item.command();
        handleOpenChange(false);
    };

    const onGlobalKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                e.preventDefault();
                handleOpenChange(!open);
            }
        },
        [open, handleOpenChange]
    );
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") bounce();

        if (parent === undefined) return;

        if (e.key === "Backspace" && search === "") {
            e.preventDefault();
            popStack();
            bounce();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onGlobalKeyDown);
        return () => document.removeEventListener("keydown", onGlobalKeyDown);
    }, [onGlobalKeyDown]);

    function bounce(delayIn = 50, delayOut = 200) {
        delay(() => {
            if (ref.current) ref.current.classList.add("scale-[102%]");
            delay(() => {
                if (ref.current) ref.current.classList.remove("scale-[102%]");
            }, delayOut);
        }, delayIn);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <SpotlightTrigger onClick={() => handleOpenChange(true)} className={className} />
            <DialogPortal>
                <DialogOverlay className="backdrop-blur-sm backdrop-saturate-200" />
                <DialogPrimitive.Content
                    ref={ref}
                    className={cn(
                        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
                        "overflow-hidden p-0 backdrop-blur-sm backdrop-saturate-200"
                    )}
                >
                    <VisuallyHidden>
                        <DialogTitle>Spotlight</DialogTitle>
                        <DialogDescription>Search for commands and actions</DialogDescription>
                    </VisuallyHidden>
                    <Command
                        onKeyDown={onKeyDown}
                        className="[&_[cmdk-group-heading]]:text-muted-foreground bg-transparent p-0.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]]:border-none [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2 [&_[cmdk-item]_svg]:h-8 [&_[cmdk-item]_svg]:w-5"
                        loop
                    >
                        <CommandInput
                            placeholder="Type a command or search..."
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandList className="scrollbar">
                            <CommandEmpty>No results found.</CommandEmpty>
                            {Object.entries(groupedItems).map(([section, items]) => (
                                <CommandGroup key={section} heading={section}>
                                    {items.map(item => (
                                        <SpotlightItem
                                            key={item.id}
                                            item={item}
                                            parents={stack}
                                            onSelect={() => {
                                                runCommand(item);
                                            }}
                                        />
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                    </Command>
                    <DialogClose className="absolute right-4 top-3 opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
                        <HoverButton>
                            <kbd className="bg-muted flex h-6 items-center rounded border px-1.5 font-mono text-xs font-medium uppercase">
                                Esc
                            </kbd>
                        </HoverButton>
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
}

interface SpotlightItemProps {
    item: SpotlightAction;
    parents: SpotlightAction[];
    onSelect: () => void;
}
function SpotlightItem({ item, parents, onSelect }: SpotlightItemProps) {
    const ActionIcon = typeof item.icon === "string" && getIcon(item.icon);

    return (
        <CommandItem
            value={item.id}
            keywords={item.keywords}
            onSelect={onSelect}
            className="justify-between data-[selected=true]:border-l-2 data-[selected=true]:border-blue-500"
        >
            <div className="flex items-center">
                {parents.length > 0 &&
                    parents.map(parent => (
                        <div key={parent.id}>
                            <span className="text-muted-foreground ml-2">{parent.title}</span>
                            <span className="mx-2">&rsaquo;</span>
                        </div>
                    ))}
                {ActionIcon ? <ActionIcon className="mr-2 h-4 w-4" /> : item.icon}
                <div className="flex flex-col">
                    {item.title}
                    {item.subtitle && (
                        <span className="text-muted-foreground text-xs">{item.subtitle}</span>
                    )}
                </div>
            </div>
            {item.shortcut.length > 0 ? (
                <div className="flex gap-1">
                    {item.shortcut.map(sc => (
                        <kbd
                            key={sc}
                            className="bg-muted h-5 rounded border px-1.5 font-mono text-xs font-medium uppercase"
                        >
                            {sc}
                        </kbd>
                    ))}
                </div>
            ) : (
                <Icon.MdOutlineKeyboardReturn className="text-muted-foreground h-6 w-6" />
            )}
        </CommandItem>
    );
}

interface SpotlightTriggerProps {
    onClick?: () => void;
    className?: string;
}
function SpotlightTrigger({ onClick, className }: SpotlightTriggerProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            aria-label="Spotlight"
            className={cn("h-6 w-6 hover:bg-transparent", className)}
        >
            <Icon.RiCommandLine className="h-6 w-6" />
        </Button>
    );
    // return (
    //     <Button
    //         variant="outline"
    //         onClick={onClick}
    //         className={cn(
    //             "bg-muted/50 text-muted-foreground relative h-8 justify-start rounded pr-12 text-sm font-normal shadow-none",
    //             className
    //         )}
    //         aria-label="Spotlight"
    //     >
    //         <span className="inline-flex">Search...</span>
    //         <kbd className="bg-muted pointer-events-none absolute right-2 flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium uppercase">
    //             <span className="text-xs">⌘</span>K
    //         </kbd>
    //     </Button>
    // );
}

const groupActions = (actions: SpotlightAction[]) => {
    return actions.reduce(
        (acc, item) => {
            const group = item.section ?? "";
            if (!acc[group]) acc[group] = [];
            acc[group].push(item);
            return acc;
        },
        {} as Record<string, SpotlightAction[]>
    );
};

const filterActive = (items: SpotlightAction[], parent?: string) => {
    return items.filter(item => item.parent === parent);
};
