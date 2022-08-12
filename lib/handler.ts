import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import auth from "./auth";

export interface NextApiRequestExtended extends NextApiRequest {
  userId: number | null;
  username: string | null;
}

export default function getHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res
        .status(501)
        .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  }).use(auth);
}
