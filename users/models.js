"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  organizationUrl: {
    type: String,
    required: true
  },
  organizationDescription: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.serialize = function() {
  return {
    organizationName: this.organizationName || "",
    organizationUrl: this.organizationUrl || "",
    organizationDescription: this.organizationDescription || "",
    username: this.username || "",
    id: this.id
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
