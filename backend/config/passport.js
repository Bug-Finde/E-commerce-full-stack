const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

// ─── Google Strategy ─────────────────────────────────────────────────────────
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) return done(new Error("No email returned from Google"), null);

        // 1. Already has a Google account → just return user
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // 2. Email already registered locally → link Google to existing account
        user = await User.findOne({ email });
        if (user) {
          user.googleId = profile.id;
          if (user.authProvider === "local") user.authProvider = "google";
          if (!user.avatar && profile.photos?.[0]?.value) {
            user.avatar = profile.photos[0].value;
          }
          user.isVerified = true; // Google accounts are pre-verified
          await user.save();
          return done(null, user);
        }

        // 3. Brand-new user → create account
        const nameParts = (profile.displayName || "").trim().split(" ");
        const firstName = nameParts[0] || "User";
        const lastName  = nameParts.slice(1).join(" ") || "";

        user = await User.create({
          firstName,
          lastName,
          email,
          googleId: profile.id,
          authProvider: "google",
          avatar: profile.photos?.[0]?.value || "",
          isVerified: true,
          isLoggedIn: false,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ─── Facebook Strategy ────────────────────────────────────────────────────────
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        // 1. Already has a Facebook account → just return user
        let user = await User.findOne({ facebookId: profile.id });
        if (user) return done(null, user);

        // 2. Email already registered → link Facebook
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            user.facebookId = profile.id;
            if (user.authProvider === "local") user.authProvider = "facebook";
            if (!user.avatar && profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            user.isVerified = true;
            await user.save();
            return done(null, user);
          }
        }

        // 3. Brand-new user → create account
        const nameParts = (profile.displayName || "").trim().split(" ");
        const firstName = nameParts[0] || "User";
        const lastName  = nameParts.slice(1).join(" ") || "";

        user = await User.create({
          firstName,
          lastName,
          email: email || `fb_${profile.id}@placeholder.com`,
          facebookId: profile.id,
          authProvider: "facebook",
          avatar: profile.photos?.[0]?.value || "",
          isVerified: true,
          isLoggedIn: false,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Passport session serialisation (not used for JWT but required by passport init)
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
