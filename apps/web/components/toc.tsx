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
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TocContextValue {
    activeId: string;
    registerItem: (id: string) => void;
    unregisterItem: (id: string) => void;
}

const TocContext = createContext<TocContextValue | null>(null);

export function useToc() {
    const context = useContext(TocContext);
    if (!context) throw new Error("useToc must be used within a TocNav");
    return context;
}

interface TocNavProps {
    children: React.ReactNode;
}
export function TocNav({ children }: TocNavProps) {
    const { t } = useTranslations();
    const [items, setItems] = useState<Set<string>>(new Set());
    const [activeId, setActiveId] = useState("");

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
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
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
        () => ({ activeId, registerItem, unregisterItem }),
        [activeId, registerItem, unregisterItem],
    );

    return (
        <TocContext.Provider value={value}>
            <nav className="flex flex-col gap-4">
                <p className="text-muted-foreground/70 ml-4 font-mono text-[10px] tracking-widest uppercase">
                    {t("toc.onThisPage")}
                </p>
                <div className="relative flex flex-col">
                    <div className="bg-border/40 absolute top-2 bottom-2 left-0 w-px" />
                    <ul className="flex flex-col">{children}</ul>
                </div>
            </nav>
        </TocContext.Provider>
    );
}

interface TocNavItemProps {
    id: string;
    children: React.ReactNode;
}
export function TocNavItem({ id, children }: TocNavItemProps) {
    const { activeId, registerItem, unregisterItem } = useToc();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = document.getElementById(id);
        if (element) {
            registerItem(id);
            setVisible(true);
            return () => unregisterItem(id);
        }
    }, [id, registerItem, unregisterItem]);

    const handleClick = () => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const isActive = activeId === id;

    if (!visible) return null;

    return (
        <li>
            <Button
                variant="ghost"
                onClick={handleClick}
                className={cn(
                    "group relative flex w-full items-center justify-start rounded-none text-sm",
                    isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground",
                )}
            >
                <span
                    className={cn(
                        "absolute top-1/2 left-0 w-0.5 -translate-y-1/2 transition-all duration-300 ease-out",
                        isActive
                            ? "bg-primary h-full opacity-100"
                            : "bg-foreground/20 h-0 w-px opacity-0 group-hover:h-4 group-hover:opacity-50",
                    )}
                />
                <span className="ml-1 inline-flex items-center gap-2">
                    {children}
                </span>
            </Button>
        </li>
    );
}
