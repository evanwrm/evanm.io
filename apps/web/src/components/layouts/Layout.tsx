import React from "react";
import { Global } from "../../validators/Global";
import { Seo } from "../../validators/Seo";
import { SocialLink } from "../../validators/Social";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import BackToTop from "../navigation/BackToTop";

interface Props {
    title?: string;
    global?: Global;
    seo?: Seo;
    socials?: SocialLink[];
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, global, seo, socials, children }: Props) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Header title={title} global={global} seo={seo} socials={socials} />
            {children}
            <BackToTop />
            <Footer global={global} socials={socials} />
        </div>
    );
};

export default Layout;
