// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoosedb";
import Product from "../../models/Product";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var message: string;
  try {
    await dbConnect();
    var product = await Product.create({
      name: "s budget liszt",
      type: "liszt",
      category: "élelmiszer",
      packageSize: 1,
      quantityType: "kg",
    });
    message = "yes";
  } catch (e) {
    console.error(e);
    message = "no";
  }

  res.status(200).json({ name: message });
}
