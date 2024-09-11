const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "voter"],
    default: "voter",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

//===>Password Hashing
userSchema.pre("save", async function (next) {
  const person = this; //===> what is this
  if (!person.isModified("password")) {
    return next();
  }
  try {
    //===> Generating Salt
    const salt = await bcrypt.genSalt(10);
    //===> hashing the pass adding the salt
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //===> overriding the password with hashedPassword
    person.password = hashedPassword;
    next();
  } catch (error) {
    return console.log(`Error in Hashing the password : ${error}`);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
