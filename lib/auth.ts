import ErrorResponse from "./errorResponse";

const jwt = require("jsonwebtoken");

export default function auth(req: any, res: any, next: any) {
  req.userId = null;
  req.username = null;

  const { auth } = req.cookies;

  if (!auth) {
    throw new ErrorResponse("Unauthorized", 401);
  } else {
    jwt.verify(auth, process.env.JWT_SECRET, (error: any, decoded: any) => {
      if (!error && decoded) {
        req.userId = decoded.id;
        req.username = decoded.name;
      }
      next();
    });
  }
}
