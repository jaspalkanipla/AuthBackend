import jwt from "jsonwebtoken";
export const refreshToken = async (req, res, next) => {
  try {
    const prevToken = req.headers.cookie.split("=")[1];
    if (prevToken) {
      jwt.verify(prevToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          res.status(403).send({ status: false, message: "invalid token" });
        } else {
          res.clearCookie(String(user.id));
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "35s"
          });
          res.cookie(user.id, token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            expires: new Date(Date.now() + 1000 * 35)
          });
          req.id = user.id;
        }
      });
      next();
    } else {
      res.status(400).send({ status: false, message: "token not found" });
    }
} catch (error) {
    console.log(error);
    res.status(400).send({ status: false, message: "token not found" });
  }
};
