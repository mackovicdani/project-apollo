const jwt = require("jsonwebtoken");

export default function auth(req: any, res: any, next: any) {
  req.userId = null;
  req.username = null;

  const { auth } = req.cookies;

  if (!auth) {
    res.status(401).json({ message: "Unauthorized" });
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
