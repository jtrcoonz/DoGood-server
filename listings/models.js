'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ListingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },

UserSchema.methods.serialize = function() {
  return {
    title: this.title || '',
    description: this.description || '',
    category: this.category || '',
    location: this.location || '',
    applyLink: this.applyLink || ''
  };
};



const Listing = mongoose.model('Listing', ListingSchema);

module.exports = {Listing};
