import React from "react";
import { Global } from "../../interfaces/Global";
import { SocialLink } from "../../interfaces/Social";
import Footer from "../footer";
import Header from "../Header";

interface Props {
    title?: string;
    global?: Global;
    socials?: SocialLink[];
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ title, global, socials, children }: Props) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center transition-all">
            <Header title={title} />
            {children}
            <Footer global={global} socials={socials} />
        </div>
    );
};

export default Layout;
