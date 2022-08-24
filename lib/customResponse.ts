import { NextApiResponse } from "next";

export default function CustomResponse(
  res: NextApiResponse,
  statusCode: number,
  massage?: string,
  data?: any
) {
  return res.status(statusCode).json({ succes: true, massage, data });
}
