import clsx from "clsx";
import {
    ActionId,
    ActionImpl,
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarResults,
    KBarSearch,
    useKBar,
    useMatches,
    useRegisterActions
} from "kbar";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { generateThemeSpotlightActions } from "../../lib/spotlightActions";
import ResponsiveButton from "../animations/ResponsiveButton";
import Icon from "../Icon";

const RenderResults: React.FC = () => {
    const { results, rootActionId } = useMatches();

    return (
        <div className="scrollbar-children px-2 pb-2">
            <KBarResults
                items={results}
                onRender={({ item, active }) =>
                    typeof item === "string" ? (
                        <div className="px-4 py-2 text-sm uppercase opacity-50">{item}</div>
                    ) : (
                        <ForwardResultItem
                            action={item}
                            active={active}
                            currentRootActionId={rootActionId ?? ""}
                        />
                    )
                }
            />
        </div>
    );
};

const ResultItem = (
    {
        action,
        active,
        currentRootActionId
    }: { action: ActionImpl; active: boolean; currentRootActionId: ActionId },
    ref: React.Ref<HTMLDivElement>
) => {
    const ancestors = useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex(ancestor => ancestor.id === currentRootActionId);
        // index + 1 only display the current action
        return action.ancestors.slice(index);
    }, [action.ancestors, currentRootActionId]);

    return (
        <div
            ref={ref}
            className={clsx(
                active
                    ? "bg-base-200 border-accent border-l-2 border-solid"
                    : "border-transparent bg-transparent",
                "flex cursor-pointer items-center justify-between rounded px-4 py-2"
            )}
        >
            <div className="flex items-center gap-2 text-sm">
                {action.icon && typeof action.icon === "string" ? (
                    <Icon className="h-6 w-6" icon={action.icon} />
                ) : (
                    action.icon
                )}
                <div className="flex flex-col">
                    <div>
                        {ancestors.length > 0 &&
                            ancestors.map(ancestor => (
                                <React.Fragment key={ancestor.id}>
                                    <span className="ml-2 opacity-50">{ancestor.name}</span>
                                    <span className="mr-2">&rsaquo;</span>
                                </React.Fragment>
                            ))}
                        <span>{action.name}</span>
                    </div>
                    {action.subtitle && <span className="text-xs">{action.subtitle}</span>}
                </div>
            </div>
            {action.shortcut?.length ? (
                <div aria-hidden className="grid grid-flow-col gap-1">
                    {action.shortcut.map(sc => (
                        <kbd
                            key={sc}
                            className="shadow-base-content/10 bg-base-100/90 border-base-content/25 rounded-md border px-2 py-1 text-sm uppercase shadow"
                        >
                            {sc}
                        </kbd>
                    ))}
                </div>
            ) : (
                <div className="flex opacity-60">
                    <Icon className="h-6 w-6" icon="MdOutlineKeyboardReturn" />
                </div>
            )}
        </div>
    );
};
const ForwardResultItem = React.forwardRef(ResultItem);

const Spotlight: React.FC = () => {
    const { query } = useKBar();
    const { setTheme } = useTheme();
    useRegisterActions(generateThemeSpotlightActions(setTheme));

    return (
        <KBarPortal>
            <KBarPositioner className="bg-base-100 fixed z-50 h-screen select-none bg-opacity-60 bg-clip-padding shadow backdrop-blur-sm backdrop-saturate-200">
                <KBarAnimator className="border-base-content/25 bg-base-100 text-base-content shadow-primary/25 w-full max-w-2xl overflow-hidden rounded-lg border bg-opacity-80 bg-clip-padding shadow-2xl backdrop-blur-sm backdrop-saturate-200 md:w-2/3">
                    <div className="mr-4 flex flex-row items-center justify-between">
                        <KBarSearch className="bg-base-100 text-base-content box-border w-full border-none bg-opacity-0 p-5 text-base outline-none" />
                        <ResponsiveButton className="flex">
                            <kbd
                                className="bg-base-100/90 border-base-content/25 shadow-base-content/10 rounded-md border px-2 py-1 text-sm uppercase shadow"
                                onClick={() => query.toggle()}
                            >
                                Esc
                            </kbd>
                        </ResponsiveButton>
                    </div>
                    <RenderResults />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
};

export default Spotlight;
