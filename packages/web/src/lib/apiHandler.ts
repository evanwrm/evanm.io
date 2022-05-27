import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextConnect } from "next-connect";

const getHandler = (): NextConnect<NextApiRequest, NextApiResponse> => {
    return nc<NextApiRequest, NextApiResponse>({
        onError(error, _req, res) {
            res.status(error.code || error.status || 500).json({
                statusCode: res.statusCode,
                error: `${error.message}`
            });
        },
        onNoMatch(req, res) {
            res.status(405).json({
                statusCode: res.statusCode,
                error: `Method ${req.method} Not Allowed`
            });
        }
    });
};

export default getHandler;
