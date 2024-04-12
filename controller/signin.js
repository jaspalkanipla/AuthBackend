import User from "./../models/userSignup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signIn = async (req, res) => {
  try {
    const { userEmail, userPass } = req.body;
    const data = await User.findOne({ userEmail });
    // IF USER FOUND
    if (data) {
      const isMatch = await bcrypt.compare(userPass, data.userPass);
      if (isMatch) {
        //PENDING
        const token = jwt.sign(
          { userEmail: data.userEmail },
          process.env.SECRET_KEY,
          { expiresIn: "50s" }
        );
        //PENDING
        res.cookie(data.userEmail, token, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          expires: new Date(Date.now() + 1000 * 50),
          // secure: false,
        });
        res.status(200).send({ message: "login success now go to dashboard" });
      } else {
        res.status(404).send({ message: "password mismatch" });
      }
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
