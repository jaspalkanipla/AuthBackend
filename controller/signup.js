import User from "./../models/userSignup.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
  try {
    const data = User(req.body);
    data.userPass = await bcrypt.hash(req.body.userPass, 10);
    const response = await data.save();

    if (response) {
      res.status(200).send({ data: response });
    } else {
      res.status(500).send({ message: "internal server error" });
    }
  } catch (error) {
    console.log(`${error.keyValue.userEmail} already exist`);
    res
      .status(401)
      .send({message:`${error.keyValue.userEmail} already exist`});
  }
};
