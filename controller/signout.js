import jwt from "jsonwebtoken";
export const signOut = async (req, res) => {
  try {
    const prevToken = req.headers.cookie.split("=")[1];
    const newPrevToken = prevToken.split(";")[0];
    if (newPrevToken) {
      jwt.verify(newPrevToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          res.status(404).send({ message: "Token not verified" });
        } else {
          res.clearCookie(String(user.userEmail));
          res.status(200).send({ message: "logout succesfully" });
        }
      });
    } else {z
      res.status(404).send({ message: "Token not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};
