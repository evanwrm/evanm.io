interface Props {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Badge = ({ startIcon, endIcon, children }: Props) => {
    return (
        <div className="badge text-base-content hover:text-primary focus:text-primary gap-2 py-3 transition">
            {startIcon && <span className="inline-block h-4 w-4">{startIcon}</span>}
            {children}
            {endIcon && <span className="inline-block h-4 w-4">{endIcon}</span>}
        </div>
    );
};

export default Badge;
