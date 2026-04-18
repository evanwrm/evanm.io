import { CheckIcon, CopyIcon } from "lucide-react";
import { Terminal } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface PreProps extends React.ComponentPropsWithoutRef<"pre"> {
    "data-title"?: string;
}
export function Pre({
    className,
    children,
    "data-title": title,
    ...props
}: PreProps) {
    const { t } = useTranslations();

    const preElement = (
        <pre
            {...props}
            className={cn(
                "scrollbar m-0! bg-transparent! p-3 [&>code]:bg-transparent [&>code]:p-0 [&>code]:whitespace-pre",
                className,
            )}
        >
            {children}
        </pre>
    );
    const copyButton = (
        <div className="absolute top-1.5 right-1.5 z-10 scale-90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label={t("common.copyCode")}
                data-copy-button
                className="relative bg-transparent"
            >
                <CheckIcon
                    data-check-icon
                    className="absolute h-6 w-6 scale-0 text-green-500 opacity-0 transition"
                />
                <CopyIcon
                    data-copy-icon
                    className="absolute h-6 w-6 transition"
                />
            </Button>
        </div>
    );

    if (title) {
        return (
            <div data-code-block className="group relative m-auto">
                <Terminal title={title}>
                    {copyButton}
                    {preElement}
                </Terminal>
            </div>
        );
    }

    return (
        <div
            data-code-block
            className="group bg-card relative m-auto rounded-md border shadow-md backdrop-blur-lg"
        >
            {copyButton}
            {preElement}
        </div>
    );
}

export interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {}
export function Code({ className, ...props }: CodeProps) {
    return (
        <code
            className={cn(
                className,
                "bg-card mx-0.5 inline-flex max-w-full overflow-auto rounded-md px-1.5 py-1 whitespace-nowrap before:content-none after:content-none",
            )}
            {...props}
        />
    );
}
