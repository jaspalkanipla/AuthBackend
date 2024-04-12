import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const initialToken = req.headers.cookie;
  const splittedToken = initialToken.split("=")[1];
  const token = splittedToken.split(";")[0];
    // const userCookie = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(500).send({ message: "token not verified" });
      } else {
        req.userEmail = user.userEmail;
      }
    });
    next();
  } else {
    res.status(500).send({ message: "token not found" });
  }
};
