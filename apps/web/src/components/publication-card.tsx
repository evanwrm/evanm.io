import { HoverButton } from "@/components/animation/hover-button";
import { Icon } from "@/components/icon";
import { Link } from "@/components/navigation/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Publication } from "@/lib/validators/Publication";
import { DotFilledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { addYears } from "date-fns";

interface Props {
    publication: Publication;
}

export const PublicationCardOld = ({ publication }: Props) => {
    const isNew = new Date(publication.year ?? publication._createdAt) > addYears(new Date(), -1);

    return (
        <div className="bg-background flex rounded-xl border p-4 shadow">
            <div className="flex flex-1 flex-col justify-start">
                <div className="flex items-center justify-start gap-4">
                    <h3 className="text-lg font-semibold">{publication.title}</h3>
                    {isNew && (
                        <Badge variant="secondary" className="bg-red-600 text-white">
                            NEW
                        </Badge>
                    )}
                </div>
                <div className="text-sm">{publication.authors.join(", ")}</div>
            </div>
            <div className="flex items-center justify-end">
                <div className="flex flex-1 justify-end gap-4">
                    {publication.url && (
                        <Link
                            href={publication.url}
                            aria-label="Official Publication"
                            className="text-foreground/80 hover:text-foreground"
                        >
                            <HoverButton>
                                <Icon.RiExternalLinkLine className="h-6 w-6" />
                            </HoverButton>
                        </Link>
                    )}
                    {publication.pdf && (
                        <Link
                            href={publication.pdf}
                            aria-label="PDF"
                            className="text-foreground/80 hover:text-foreground"
                        >
                            <HoverButton>
                                <Icon.FaFilePdf className="h-6 w-6" />
                            </HoverButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export const PublicationCard = ({ publication }: Props) => {
    const isNew = new Date(publication.year ?? publication._createdAt) > addYears(new Date(), -1);
    const authors = publication.authors.join(", ");

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <CardTitle>{publication.title}</CardTitle>
                    <div className="flex flex-1 justify-end gap-2">
                        {publication.url && (
                            <Link
                                href={publication.url}
                                aria-label="Official Publication"
                                className="text-foreground/80 hover:text-foreground"
                            >
                                <HoverButton>
                                    <Icon.RiExternalLinkLine className="h-6 w-6" />
                                </HoverButton>
                            </Link>
                        )}
                        {publication.pdf && (
                            <Link
                                href={publication.pdf}
                                aria-label="PDF"
                                className="text-foreground/80 hover:text-foreground"
                            >
                                <HoverButton>
                                    <Icon.FaFilePdf className="h-6 w-6" />
                                </HoverButton>
                            </Link>
                        )}
                        {publication.award && (
                            <Tooltip>
                                <TooltipTrigger>
                                    <StarFilledIcon className="h-4 w-4 text-yellow-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{publication.award}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        {isNew && (
                            <Badge
                                variant="secondary"
                                className="bg-red-600 text-white hover:bg-red-600"
                            >
                                NEW
                            </Badge>
                        )}
                    </div>
                </div>
                <p className="text-muted-foreground text-sm">{authors}</p>
                <div className="text-muted-foreground flex flex-wrap items-center space-x-2 text-sm">
                    <span className="max-w-24 truncate sm:max-w-48 md:max-w-96">
                        {publication.journal || publication.booktitle}
                    </span>
                    {publication.year && (
                        <div className="flex items-center gap-2">
                            <DotFilledIcon />
                            {publication.year}
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <Accordion type="single" collapsible>
                    <AccordionItem value="abstract" className="border-none">
                        <AccordionTrigger className="p-0 pb-2 text-sm font-normal">
                            Abstract
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="prose text-left text-sm">{publication.abstract}</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
};
