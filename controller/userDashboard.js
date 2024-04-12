import User from "../models/userSignup.js";

export const userDashboard = async (req, res) => {
  const email=req.userEmail
  console.log(email);
  try {
    const data = await User.findOne({ userEmail: email },{userPass:0});
    // const data = await User.find({ userEmail: email });
    if (data) {
      console.log(data);
      res.status(200).send(data);
    } else {
      console.log("data not found");
      res.status(404).send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error);
  }
  //   const {} = res.send({ message: "authenticated", email: req.userEmail });
};
