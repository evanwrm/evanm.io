"use client";

import {
    ChevronRightIcon,
    CommandIcon,
    CornerDownLeftIcon,
    SearchIcon,
} from "lucide-react";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupCommandInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

type SpotlightContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
    pages: string[];
    currentPage: string;
    pushPage: (page: string) => void;
    popPage: () => void;
    bounce: () => void;
    bounceRef: React.MutableRefObject<() => void>;
};

const SpotlightContext = createContext<SpotlightContextValue | null>(null);

export function useSpotlight() {
    const ctx = useContext(SpotlightContext);
    if (!ctx) throw new Error("useSpotlight must be used within <Spotlight>");
    return ctx;
}

export function Spotlight({ children }: { children: React.ReactNode }) {
    const [open, setOpenState] = useState(false);
    const [search, setSearch] = useState("");
    const [pages, setPages] = useState<string[]>([]);
    const currentPage = pages[pages.length - 1] ?? "home";

    const bounceRef = useRef<() => void>(() => {});
    const bounce = useCallback(() => bounceRef.current(), []);

    const setOpen = useCallback(
        (value: boolean) => {
            if (value) {
                setSearch("");
                setPages([]);
                setOpenState(true);
                setTimeout(bounce, 50);
            } else {
                setOpenState(false);
            }
        },
        [bounce],
    );

    const pushPage = useCallback(
        (page: string) => {
            setPages(prev => [...prev, page]);
            setSearch("");
            bounce();
        },
        [bounce],
    );

    const popPage = useCallback(() => {
        if (pages.length > 0) {
            setPages(prev => prev.slice(0, -1));
            setSearch("");
        }
    }, [pages.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const isInput = ["INPUT", "TEXTAREA"].includes(
                (e.target as HTMLElement)?.tagName,
            );
            if (
                (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
                (e.key === "/" && !isInput)
            ) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, setOpen]);

    const contextValue = useMemo(
        () => ({
            open,
            setOpen,
            search,
            setSearch,
            pages,
            currentPage,
            pushPage,
            popPage,
            bounce,
            bounceRef,
        }),
        [open, setOpen, search, pages, currentPage, pushPage, popPage, bounce],
    );

    return (
        <SpotlightContext.Provider value={contextValue}>
            {children}
        </SpotlightContext.Provider>
    );
}

interface SpotlightListProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}
export function SpotlightList({
    children,
    className,
    title = "Spotlight",
    description = "Search for commands and actions",
}: SpotlightListProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { open, setOpen, bounceRef } = useSpotlight();

    bounceRef.current = () => {
        const el = containerRef.current?.closest("[data-slot=dialog-content]");
        if (!el) return;
        el.classList.add("scale-[102%]");
        setTimeout(() => el.classList.remove("scale-[102%]"), 150);
    };

    return (
        <CommandDialog
            open={open}
            onOpenChange={setOpen}
            title={title}
            description={description}
            showCloseButton={false}
            className={cn("backdrop-blur-sm backdrop-saturate-200", className)}
        >
            <div ref={containerRef}>{children}</div>
        </CommandDialog>
    );
}

interface SpotlightInputProps {
    placeholder?: string;
}
export function SpotlightInput({
    placeholder = "Type a command or search...",
}: SpotlightInputProps) {
    const { search, setSearch, setOpen, pages, popPage, bounce } =
        useSpotlight();

    return (
        <InputGroup className="h-11 rounded-b-none border-none shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupCommandInput
                placeholder={placeholder}
                value={search}
                onValueChange={setSearch}
                onKeyDown={e => {
                    if (
                        e.key === "Backspace" &&
                        search === "" &&
                        pages.length > 0
                    ) {
                        e.preventDefault();
                        popPage();
                        bounce();
                    }
                }}
            />
            <InputGroupAddon align="inline-end">
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                >
                    <Kbd>Esc</Kbd>
                </button>
            </InputGroupAddon>
        </InputGroup>
    );
}

interface SpotlightGroupProps {
    heading: string;
    page?: string;
    children: React.ReactNode;
}
export function SpotlightGroup({
    heading,
    page,
    children,
}: SpotlightGroupProps) {
    const { currentPage, search } = useSpotlight();
    const isVisible = !page || page === currentPage || search !== "";

    if (!isVisible) return null;

    return <CommandGroup heading={heading}>{children}</CommandGroup>;
}

interface SpotlightItemProps {
    value: string;
    keywords?: string[];
    icon?: React.ReactNode;
    shortcut?: string[];
    subtitle?: string;
    breadcrumb?: string;
    onSelect?: () => void;
    closeOnSelect?: boolean;
    children: React.ReactNode;
}
export function SpotlightItem({
    value,
    keywords,
    icon,
    shortcut,
    subtitle,
    breadcrumb,
    onSelect,
    closeOnSelect = true,
    children,
}: SpotlightItemProps) {
    const { setOpen, bounce } = useSpotlight();

    return (
        <CommandItem
            value={value}
            keywords={keywords}
            onSelect={() => {
                bounce();
                onSelect?.();
                if (closeOnSelect) setOpen(false);
            }}
            className="group/item relative justify-between"
        >
            <div className="absolute top-0 left-0 h-full w-0.5 origin-center scale-y-0 bg-primary transition-transform duration-200 group-data-[selected=true]/item:scale-y-100" />
            <div className="flex items-center gap-3">
                {icon && <span className="size-3.5">{icon}</span>}
                <div className="flex flex-col">
                    <span>
                        {breadcrumb && (
                            <span className="text-muted-foreground">
                                {breadcrumb}
                                <ChevronRightIcon className="mx-1.5 inline-block size-2.5!" />
                            </span>
                        )}
                        {children}
                    </span>
                    {subtitle && (
                        <span className="text-muted-foreground text-xs">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
            {shortcut && shortcut.length > 0 ? (
                <KbdGroup>
                    {shortcut.map(key => (
                        <Kbd key={key}>{key}</Kbd>
                    ))}
                </KbdGroup>
            ) : (
                <CornerDownLeftIcon className="size-3.5! text-muted-foreground" />
            )}
        </CommandItem>
    );
}

export function SpotlightTrigger({ className }: { className?: string }) {
    const { setOpen } = useSpotlight();
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            aria-label="Open spotlight"
            className={cn(
                className,
                "text-muted-foreground hover:text-foreground",
            )}
        >
            <CommandIcon className="size-5" />
        </Button>
    );
}
