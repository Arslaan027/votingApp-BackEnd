const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" }); // return added
      }

      const isPasswordMatch = await user.comparePassword(password); // await added
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
