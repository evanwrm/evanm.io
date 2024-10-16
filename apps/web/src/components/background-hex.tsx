import { cn } from "@/lib/utils";

interface Props {
    hexSize?: number;
    className?: string;
}

export const HexBackground = ({ hexSize = 30, className }: Props) => {
    return (
        <div className={cn("pointer-events-none absolute inset-0 select-none", className)}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask id="bg-fade" maskUnits="userSpaceOnUse">
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                            <stop offset="0" stopColor="#FFFFFF"></stop>
                            <stop offset="1" stopColor="#000000"></stop>
                        </linearGradient>
                        <rect fill="url(#gradient)" width="100%" height="100%"></rect>
                    </mask>
                    <pattern
                        id="bg-hex"
                        width={`${hexSize}px`}
                        height={`${hexSize * 1.15642458101}px`} // 1.15642458101
                        viewBox="0 0 179 207"
                        patternUnits="userSpaceOnUse"
                        stroke="currentcolor"
                    >
                        <line x1="89" y1="206.5" x2="149" y2="206.5" />
                        <line x1="148.567" y1="206.712" x2="178.567" y2="154.75" />
                        <line x1="178.567" y1="155.212" x2="148.567" y2="103.25" />
                        <line x1="149" y1="103.5" x2="89" y2="103.5" />
                        <line x1="89.433" y1="103.25" x2="59.433" y2="155.212" />
                        <line x1="59.433" y1="154.75" x2="89.433" y2="206.712" />
                        <line y1="155" x2="60" y2="155" />
                        <line x1="89.567" y1="103.712" x2="59.567" y2="51.75" />
                        <line x1="60" y1="52" y2="52" />
                        <line x1="148.567" y1="103.712" x2="178.567" y2="51.75" />
                        <line x1="178.567" y1="52.2115" x2="148.567" y2="0.249994" />
                        <line x1="89.433" y1="0.25" x2="59.433" y2="52.2115" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg-hex)" mask="url(#bg-fade)" />
            </svg>
        </div>
    );
};
