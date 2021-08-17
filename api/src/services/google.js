import passport from "passport";
import { config } from "dotenv";
import user from "../db/models";
const googleTokenStrategy = require("passport-google-token").Strategy;
config();

const getProfile = (profile) => {
  const { id, displayName, emails, provider } = profile;
  //same as if (email && email.length)
  if (emails?.length) {
    const email = emails[0].value;
    return {
      googleId: id,
      name: displayName,
      email,
      provider,
    };
  }
  return null;
};

passport.use(
  new googleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingGoogleAccount = await user.findOne({
          where: { googleId: profile.id },
        });
        if (!existingGoogleAccount) {
          const existingEmailAccount = await user.findOne({
            where: { email: getProfile(profile).email },
          });

          if (!existingEmailAccount) {
            const newAccount = await user.create(getProfile(profile));
            return done(null, newAccount);
          }
          return done(null, existingEmailAccount);
        }
        return done(null, existingGoogleAccount);
      } catch (error) {
        throw new Error(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user
    .findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => done(error));
});
