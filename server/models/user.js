/* user.js MODEL */
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

// create a user schema for use in MongoDB
const UserSchema = new Schema({
    email: String,
    username: String,
    password: String
}, {
    collection: 'users'
});

// ALWAYS HASH PASSWORDS WHEN STORING THEM IN THE DATABASE
UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});
// This attaches a method to the user schema, allowing us to check if the password matches the encrypted version
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

// Now set the model up and export it
const Model = mongoose.model('User', UserSchema);
module.exports = Model;