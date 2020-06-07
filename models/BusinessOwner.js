const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const businessOwnerSchema = new Schema({
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
  category: String,
  categoryId: String,
  businesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

businessOwnerSchema.pre("save", function (next) {
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

businessOwnerSchema.methods.comparePassword = function (candidatePassword) {
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

module.exports = mongoose.model("BusinessOwner", businessOwnerSchema);
