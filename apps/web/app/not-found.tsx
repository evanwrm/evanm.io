import { FadeIn } from "components/animation/fade-in";
import { Link } from "components/navigation/link";
import { Button } from "components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 Not Found",
};

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center p-4 text-center">
            <FadeIn>
                <div className="flex flex-col items-center gap-6">
                    <h1 className="font-bold font-mono text-8xl text-muted-foreground/20">
                        404
                    </h1>
                    <div className="space-y-2">
                        <h2 className="font-bold text-2xl tracking-tight">
                            Page not found
                        </h2>
                        <p className="text-muted-foreground">
                            The page you're looking for doesn't exist.
                        </p>
                    </div>
                    <Button asChild variant="link" className="mt-4 gap-2">
                        <Link href="/">
                            <MoveLeftIcon className="size-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </FadeIn>
        </div>
    );
}
