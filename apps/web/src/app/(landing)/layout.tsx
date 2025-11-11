import { HexBackground } from "@/components/background-hex";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { env } from "@/lib/env/client.mjs";
import { seoFind, settingsFind, socialFind } from "@/lib/services/sanity/queries";

const headerRoutes = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/#projects",
        label: "Projects"
    },
    {
        href: "/#publications",
        label: "Publications"
    },
    {
        href: `${env.NEXT_PUBLIC_SITE_URL}/cv`,
        label: "CV"
    }
];

interface Props {
    children: React.ReactNode;
}

export default async function LandingLayout({ children }: Props) {
    const [socials, seo, settings] = await Promise.all([socialFind({}), seoFind(), settingsFind()]);

    return (
        <>
            <Header socials={socials} seo={seo} settings={settings} routes={headerRoutes} />
            <HexBackground className="h-48 text-foreground/40" />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer routes={headerRoutes} />
        </>
    );
}
