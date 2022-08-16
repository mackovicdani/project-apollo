import auth from "../../../lib/auth";
import getHandler from "../../../lib/handler";

export default getHandler()
  .use(auth)
  .get(async (req, res) => {
    return res.json({
      message: "Welcome back to the app!",
      username: req.username,
    });
  });
