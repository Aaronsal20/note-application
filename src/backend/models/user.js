const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: { type: Number, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
