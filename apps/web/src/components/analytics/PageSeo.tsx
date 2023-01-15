import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { NextSeo, NextSeoProps } from "next-seo";
import { DeepNullable } from "src/types/utils";

interface Props {
    title?: string;
}

const PageSeo = async ({ title }: Props) => {
    const caller = appRouter.createCaller(await createInnerContext());
    const seo = await caller.seo.find();

    const tagOverride = {
        title
    };
    const ogOverride = {
        title
    };
    const extendedSeo: Partial<DeepNullable<NextSeoProps>> = {
        ...seo,
        ...tagOverride,
        openGraph: { ...seo?.openGraph, ...ogOverride }
    };
    const pageSeo = extendedSeo as NextSeoProps;

    return <NextSeo useAppDir={true} {...pageSeo} />;
};

export default PageSeo;
