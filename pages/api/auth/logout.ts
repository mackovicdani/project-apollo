import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";
const cookie = require("cookie");

export default getHandler()
  .use(auth)
  .get(async (req, res) => {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      }),
    ]);
    CustomResponse(res, 200, `Logged out ${req.username}`);
  });
