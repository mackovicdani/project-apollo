import auth from "../../lib/auth";
import CustomResponse from "../../lib/customResponse";
import formMiddleWare from "../../lib/formMiddleWare";
import getHandler from "../../lib/handler";

export default getHandler()
  .use(auth)
  .use(formMiddleWare)
  .post(async (req, res, next) => {
    try {
      CustomResponse(res, 201, "New file added!", req.fields.newFilename);
    } catch (error) {
      next(error);
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
