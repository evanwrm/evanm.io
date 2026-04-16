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
                "bg-card overflow-hidden rounded-xl border shadow-md backdrop-blur-lg",
                className,
            )}
        >
            <div className="bg-muted/50 flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/50" />
                    <div className="size-3 rounded-full bg-yellow-500/50" />
                    <div className="size-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-muted-foreground ml-2 font-mono text-xs">
                    {title}
                </div>
            </div>
            <div className="text-card-foreground relative font-mono text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
