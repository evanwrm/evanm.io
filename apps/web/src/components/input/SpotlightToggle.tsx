import Icon from "@/components/Icon";
import { cn } from "@/lib/utils/styles";
import { useKBar } from "kbar";

interface Props {
    className?: string;
}

const SpotlightToggle = ({ className }: Props) => {
    const { query } = useKBar();

    return (
        <div className={cn(className)} onClick={() => query.toggle()}>
            <Icon.RiCommandLine className="h-6 w-6" />
        </div>
    );
};

export default SpotlightToggle;
