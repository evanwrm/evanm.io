import { NextApiRequest, NextApiResponse } from "next";

import { openApiDocument } from "@/lib/server/openapi";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send(openApiDocument);
};

export default handler;
