import React from "react";
import { Global } from "../../interfaces/Global";
import { Seo } from "../../interfaces/Seo";
import { SocialLink } from "../../interfaces/Social";
import Footer from "../Footer";
import Header from "../Header";

interface Props {
    title?: string;
    global?: Global;
    seo?: Seo;
    socials?: SocialLink[];
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, global, seo, socials, children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Header title={title} global={global} seo={seo} socials={socials} />
            {children}
            <Footer global={global} socials={socials} />
        </div>
    );
};

export default Layout;
