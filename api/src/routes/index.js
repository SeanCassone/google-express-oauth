import passport from "passport";
import authController from "../controllers/authController";

const routes = (app) => {
  app.get("/", (req, res) =>
    res.send("Welcome to my Google Oauth express server")
  );
  app.post(
    "/oauth/google",
    passport.authenticate("google-token", { session: false }),
    authController.googleLogin
  );
};

export default routes;
