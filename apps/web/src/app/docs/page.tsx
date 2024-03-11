"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const Docs = () => {
    return <SwaggerUI url="/api/openapi.json" />;
};

export default Docs;
