import { createContext } from "@/lib/server/context";
import { appRouter } from "@/lib/server/routers/app";
import { NextApiRequest, NextApiResponse } from "next";
import { createOpenApiNextHandler } from "trpc-openapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const openapiHandler = createOpenApiNextHandler({
        router: appRouter,
        createContext
    });
    res.setHeader("Access-Control-Allow-Origin", "*"); // TODO: look into cors
    return openapiHandler(req, res);
};

export default handler;
