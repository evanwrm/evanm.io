"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TocContextValue {
    items: Set<string>;
    activeId: string;
    registerItem: (id: string) => void;
    unregisterItem: (id: string) => void;
}

const TocContext = createContext<TocContextValue | null>(null);

export function TocProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Set<string>>(new Set());
    const [activeId, setActiveId] = useState<string>("");

    const registerItem = useCallback((id: string) => {
        setItems(prev => {
            if (prev.has(id)) return prev;
            return new Set(prev).add(id);
        });
    }, []);
    const unregisterItem = useCallback((id: string) => {
        setItems(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, []);

    useEffect(() => {
        if (items.size === 0) return;
        const observer = new IntersectionObserver(
            entries => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                }
            },
            { rootMargin: "-20% 0% -60% 0%", threshold: 0 },
        );
        for (const id of items) {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        }
        return () => observer.disconnect();
    }, [items]);

    const value = useMemo(
        () => ({ items, activeId, registerItem, unregisterItem }),
        [items, activeId, registerItem, unregisterItem],
    );

    return <TocContext.Provider value={value}>{children}</TocContext.Provider>;
}

export function useToc() {
    const context = useContext(TocContext);
    if (!context) throw new Error("useToc must be used within a TocProvider");
    return context;
}

interface TocSectionProps {
    id: string;
    children: React.ReactNode;
}
export function TocSection({ id, children }: TocSectionProps) {
    const { registerItem, unregisterItem } = useToc();

    useEffect(() => {
        registerItem(id);
        return () => unregisterItem(id);
    }, [id, registerItem, unregisterItem]);

    return (
        <section id={id} className="scroll-mt-20">
            {children}
        </section>
    );
}

interface TocNavProps {
    children: React.ReactNode;
}
export function TocNav({ children }: TocNavProps) {
    return (
        <nav className="flex flex-col gap-4">
            <p className="ml-4 font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest">
                On This Page
            </p>
            <div className="relative flex flex-col">
                <div className="absolute top-2 bottom-2 left-0 w-px bg-border/40" />
                <ul className="flex flex-col">{children}</ul>
            </div>
        </nav>
    );
}

interface TocNavItemProps {
    id: string;
    children: React.ReactNode;
}
export function TocNavItem({ id, children }: TocNavItemProps) {
    const { items, activeId } = useToc();
    const isActive = activeId === id;

    const handleClick = () => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    if (!items.has(id)) return null;

    return (
        <li>
            <Button
                variant="ghost"
                onClick={handleClick}
                className={cn(
                    "group relative flex w-full items-center justify-start rounded-none text-sm",
                    isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                )}
            >
                <span
                    className={cn(
                        "absolute top-1/2 left-0 w-0.5 -translate-y-1/2 transition-all duration-300 ease-out",
                        isActive
                            ? "h-full bg-primary opacity-100"
                            : "h-0 w-px bg-foreground/20 opacity-0 group-hover:h-4 group-hover:opacity-50",
                    )}
                />
                <span className="ml-1 inline-flex items-center gap-2">
                    {children}
                </span>
            </Button>
        </li>
    );
}
