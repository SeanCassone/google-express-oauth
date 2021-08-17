import { Jwt } from "jsonwebtoken";
import { user } from "../db/models";

const authController = {
  async googleLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ error: "User was not authenticated" });
    }
    const { email } = req.user;
    const user = await user.findOne({ where: { email } });
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    return res.status(200).send({ token, user });
  },
};
export default authController;
