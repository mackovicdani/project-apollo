import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

export default getHandler()
  .use(auth)
  .get(async (req, res) => {
    CustomResponse(res, 200, "Welcome back", req.username);
  });
