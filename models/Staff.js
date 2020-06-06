const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const staffSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

staffSchema.pre("save", function (next) {
  const staff = this;
  if (!staff.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(staff.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      staff.password = hash;
      next();
    });
  });
});

staffSchema.methods.comparePassword = function (candidatePassword) {
  const staff = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, staff.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

module.exports = mongoose.model("Staff", staffSchema);
