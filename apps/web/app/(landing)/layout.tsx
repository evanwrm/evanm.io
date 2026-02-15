import { HexBackground } from "@/components/background-hex";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
    seoFind,
    settingsFind,
    socialFind,
} from "@/lib/services/sanity/queries";

const headerRoutes = [
    { href: "/", label: "Home" },
    { href: "/cv", label: "CV" },
];

interface Props {
    children: React.ReactNode;
}

export default async function LandingLayout({ children }: Props) {
    const [socials, seo, settings] = await Promise.all([
        socialFind({}),
        seoFind(),
        settingsFind(),
    ]);

    return (
        <>
            <HexBackground className="h-48 text-foreground/40" />
            <Header
                routes={headerRoutes}
                socials={socials}
                seo={seo}
                settings={settings}
            />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer routes={headerRoutes} />
        </>
    );
}
