const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const BusinessOwnerSchema = new Schema({
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

BusinessOwnerSchema.pre("save", function (next) {
  const owner = this;
  if (!owner.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(owner.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      owner.password = hash;
      next();
    });
  });
});

BusinessOwnerSchema.methods.comparePassword = function (candidatePassword) {
  const owner = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, owner.password, (err, isMatch) => {
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

mongoose.model("BusinessOwner", BusinessOwnerSchema);
