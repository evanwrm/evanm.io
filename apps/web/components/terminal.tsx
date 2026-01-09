import { cn } from "@/lib/utils";

interface Props {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Terminal({ title = "bash", children, className }: Props) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-xl border bg-card shadow-md backdrop-blur-lg",
                className,
            )}
        >
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/50" />
                    <div className="size-3 rounded-full bg-yellow-500/50" />
                    <div className="size-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-2 font-mono text-muted-foreground text-xs">
                    {title}
                </div>
            </div>
            <div className="relative font-mono text-card-foreground text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
