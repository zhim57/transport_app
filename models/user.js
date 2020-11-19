const mongoose = require('mongoose');
const Schema = mongoose.Schema
// kyle added 4-5
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        // kyle added 12
        password: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }
);
// kyle added 17-40
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;