import AppBar from "@/components/navigation/AppBar";
import { createInnerContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";

interface Props {
    title?: string;
}

const Header = async ({ title }: Props) => {
    const caller = appRouter.createCaller(await createInnerContext());
    const [seo, socials] = await Promise.all([caller.seo.find(), caller.socials.find()]);

    const github = socials.find(social => social.socialId === "github");
    if (github) {
        const repository = seo?.openGraph?.site_name ?? "";
        github.url = `${github.url}/${repository}`;
    }

    return (
        <>
            <AppBar title={title} github={github} />
        </>
    );
};

export default Header;
