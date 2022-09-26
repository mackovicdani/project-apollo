import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export interface NextApiRequestExtended extends NextApiRequest {
  files: any;
  fields: any;
  userId: string | null;
  username: string | null;
}

export default function getHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      return res.status(error.statusCode || 500).json({
        succes: false,
        error: error.message || "Server Error",
      });
    },
    onNoMatch(req, res) {
      return res
        .status(405)
        .json({ succes: false, error: `Method ${req.method} Not Allowed` });
    },
  });
}
