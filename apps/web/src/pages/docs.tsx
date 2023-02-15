import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

// TODO: see if we cant move this to the appdir
const Docs: NextPage = () => {
    return <SwaggerUI url="/api/openapi.json" />;
};

export default Docs;
