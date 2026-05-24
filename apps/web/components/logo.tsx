import { cn } from "@/lib/utils";

export function LogoWordmark({
    className,
    ...props
}: React.ComponentProps<"span">) {
    return (
        <span className={cn("font-bold", className)} {...props}>
            evanm<span className="text-red-600">.io</span>
        </span>
    );
}
