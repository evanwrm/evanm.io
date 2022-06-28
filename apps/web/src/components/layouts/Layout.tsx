import React from "react";
import { Global } from "../../validators/Global";
import { Seo } from "../../validators/Seo";
import { SocialLink } from "../../validators/Social";
import BackToTop from "../BackToTop";
import Footer from "../Footer";
import Header from "../Header";
import Portal from "../Portal";

interface Props {
    title?: string;
    global?: Global;
    seo?: Seo;
    socials?: SocialLink[];
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, global, seo, socials, children }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Header title={title} global={global} seo={seo} socials={socials} />
            {children}
            <Footer global={global} socials={socials} />
            <Portal>
                <BackToTop />
            </Portal>
        </div>
    );
};

export default Layout;
